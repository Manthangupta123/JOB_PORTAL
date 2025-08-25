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
