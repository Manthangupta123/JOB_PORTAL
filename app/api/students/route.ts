import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function GET() {
  try {
    // Absolute path to /public/data/students.json
    const dataDirectory = path.join(process.cwd(), "public", "data");
    const filePath = path.join(dataDirectory, "students.json");

    // Read and parse JSON file
    const fileContents = await fs.readFile(filePath, "utf8");
    const jsonData = JSON.parse(fileContents);

    return NextResponse.json(jsonData);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newStudent = await request.json();

    // Validate required fields
    if (!newStudent.name || !newStudent.email || !newStudent.department || !newStudent.year) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Generate ID if not provided
    if (!newStudent.id) {
      newStudent.id = `STU-${Date.now()}`;
    }

    // Set default values
    newStudent.status = newStudent.status || "pending";
    newStudent.submissionDate = newStudent.submissionDate || new Date().toISOString();
    newStudent.jriScore = newStudent.jriScore || 0;

    // Absolute path to /public/data/students.json
    const dataDirectory = path.join(process.cwd(), "public", "data");
    const filePath = path.join(dataDirectory, "students.json");

    // Read existing data
    const fileContents = await fs.readFile(filePath, "utf8");
    const students = JSON.parse(fileContents);

    // Add new student
    students.push(newStudent);

    // Write back to file
    await fs.writeFile(filePath, JSON.stringify(students, null, 2));

    return NextResponse.json(newStudent, { status: 201 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to add student" }, { status: 500 });
  }
}
