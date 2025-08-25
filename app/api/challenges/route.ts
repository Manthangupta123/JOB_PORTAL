import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const challenges = [
    {
      id: "1",
      title: "AI for Social Impact Hackathon",
      organizer: "Tech for Good Society",
      theme: "Social Impact",
      endDate: "2024-02-15",
      startDate: "2024-02-13",
      registrationDeadline: "2024-02-10",
      participants: 156,
      maxParticipants: 200,
      description:
        "Build AI solutions that address real-world social challenges and make a positive impact on communities.",
      fullDescription:
        "Join us for an intensive 48-hour hackathon focused on leveraging artificial intelligence to solve pressing social issues. Participants will work in teams to develop innovative AI-powered solutions that address challenges in healthcare accessibility, educational equity, environmental sustainability, and social justice. This event brings together passionate developers, data scientists, designers, and social advocates to create technology that truly makes a difference in people's lives.",
      type: "hackathon",
      difficulty: "medium",
      duration: "48 hours",
      status: "active",
      prize: "₹50,000 + Mentorship Program",
      tags: ["AI", "Machine Learning", "Social Impact", "Healthcare", "Education"],
      progress: 78,
      venue: {
        name: "Innovation Hub, Main Campus",
        address: "Block A, Ground Floor",
        capacity: 200,
      },
      tracks: [
        { name: "Healthcare AI", description: "AI solutions for medical diagnosis, treatment, and accessibility" },
        { name: "Education Technology", description: "Personalized learning and educational accessibility tools" },
        { name: "Environmental Solutions", description: "AI for climate change and environmental monitoring" },
      ],
      mentors: [
        { name: "Dr. Priya Sharma", expertise: "AI in Healthcare", company: "MedTech Solutions" },
        { name: "Rahul Gupta", expertise: "EdTech Innovation", company: "LearnSmart AI" },
        { name: "Sarah Chen", expertise: "Environmental AI", company: "GreenTech Labs" },
      ],
      teamSize: { min: 2, max: 4 },
      rules: [
        "Teams must consist of 2-4 members",
        "All code must be written during the hackathon period",
        "Use of pre-existing libraries and APIs is allowed",
        "Solutions must address a real social problem",
        "Final presentation must be completed within 5 minutes",
        "All team members must be registered participants",
      ],
      requirements: [
        "Basic programming knowledge in Python, JavaScript, or similar",
        "Understanding of AI/ML concepts (beginner level acceptable)",
        "Laptop with development environment setup",
        "Enthusiasm for social impact and problem-solving",
      ],
      judging: {
        criteria: ["Social Impact Potential", "Technical Innovation", "Feasibility", "Presentation Quality"],
        judges: [
          { name: "Prof. Anita Desai", role: "AI Research Director" },
          { name: "Vikram Patel", role: "Social Impact Investor" },
          { name: "Dr. Lisa Wang", role: "Healthcare Innovation Expert" },
        ],
      },
      timeline: [
        {
          phase: "Registration Opens",
          date: "2024-01-15",
          description: "Team registration and idea submission begins",
        },
        { phase: "Registration Deadline", date: "2024-02-10", description: "Final date for team registration" },
        {
          phase: "Hackathon Kickoff",
          date: "2024-02-13 09:00",
          description: "Opening ceremony and problem statements revealed",
        },
        {
          phase: "Development Phase",
          date: "2024-02-13-15",
          description: "48 hours of intensive development and mentoring",
        },
        { phase: "Final Presentations", date: "2024-02-15 14:00", description: "Team presentations and judging" },
        {
          phase: "Awards Ceremony",
          date: "2024-02-15 17:00",
          description: "Winner announcement and prize distribution",
        },
      ],
      organizers: [
        { name: "Dr. Rajesh Kumar", role: "Faculty Coordinator", avatar: "/placeholder.svg" },
        { name: "Priya Patel", role: "Student Lead", avatar: "/placeholder.svg" },
        { name: "Tech for Good Society", role: "Organizing Committee", avatar: "/placeholder.svg" },
      ],
    },
    {
      id: "2",
      title: "FinTech Innovation Challenge",
      organizer: "Finance Club & Industry Partners",
      theme: "Financial Technology",
      endDate: "2024-03-20",
      startDate: "2024-03-19",
      registrationDeadline: "2024-03-15",
      participants: 89,
      maxParticipants: 150,
      description:
        "Develop cutting-edge financial technology solutions for the next generation of banking and payments.",
      fullDescription:
        "Dive into the world of financial technology and create innovative solutions that could reshape how we handle money, investments, and financial services. This 36-hour intensive challenge focuses on developing secure, user-friendly, and scalable FinTech applications. Participants will tackle real problems in digital payments, blockchain technology, personal finance management, and AI-driven financial advisory services.",
      type: "hackathon",
      difficulty: "hard",
      duration: "36 hours",
      status: "upcoming",
      prize: "₹75,000 + Internship Opportunities",
      tags: ["FinTech", "Blockchain", "Payments", "AI", "Security"],
      progress: 59,
      venue: {
        name: "Business Incubation Center",
        address: "Block C, 3rd Floor",
        capacity: 150,
      },
      tracks: [
        { name: "Digital Payments", description: "Next-gen payment solutions and mobile wallets" },
        { name: "Blockchain & Crypto", description: "Decentralized finance and cryptocurrency applications" },
        { name: "AI in Finance", description: "Machine learning for trading, risk assessment, and advisory" },
      ],
      mentors: [
        { name: "Amit Sharma", expertise: "Digital Payments", company: "PayTech Solutions" },
        { name: "Dr. Neha Agarwal", expertise: "Blockchain Technology", company: "CryptoInnovate" },
        { name: "Ravi Kumar", expertise: "Financial AI", company: "SmartFinance AI" },
      ],
      teamSize: { min: 3, max: 5 },
      rules: [
        "Teams must have 3-5 members with diverse skill sets",
        "Focus on real-world financial problems and solutions",
        "Security and compliance considerations are mandatory",
        "Use of existing financial APIs and services is encouraged",
        "Demo must include working prototype",
        "Business model presentation required",
      ],
      requirements: [
        "Programming experience in web or mobile development",
        "Basic understanding of financial systems",
        "Knowledge of security best practices",
        "Interest in entrepreneurship and innovation",
      ],
      judging: {
        criteria: ["Innovation", "Technical Excellence", "Market Potential", "Security Implementation"],
        judges: [
          { name: "Suresh Patel", role: "FinTech Industry Expert" },
          { name: "Dr. Kavita Singh", role: "Cybersecurity Specialist" },
          { name: "Arjun Mehta", role: "Venture Capital Partner" },
        ],
      },
      timeline: [
        { phase: "Registration Opens", date: "2024-02-01", description: "Team formation and registration begins" },
        { phase: "Pre-event Workshop", date: "2024-03-10", description: "FinTech fundamentals and API workshop" },
        { phase: "Registration Deadline", date: "2024-03-15", description: "Final registration cutoff" },
        { phase: "Challenge Begins", date: "2024-03-19 10:00", description: "Kickoff and problem statement release" },
        { phase: "Mentoring Sessions", date: "2024-03-19-20", description: "Expert mentoring and guidance" },
        { phase: "Final Pitches", date: "2024-03-20 15:00", description: "Team presentations to judges" },
        {
          phase: "Networking & Awards",
          date: "2024-03-20 18:00",
          description: "Industry networking and winner announcement",
        },
      ],
      organizers: [
        { name: "Prof. Deepak Gupta", role: "Faculty Advisor", avatar: "/placeholder.svg" },
        { name: "Sneha Reddy", role: "Finance Club President", avatar: "/placeholder.svg" },
        { name: "Industry Partners", role: "Sponsor Representatives", avatar: "/placeholder.svg" },
      ],
    },
    {
      id: "3",
      title: "Smart Cities & IoT Innovation Hackathon",
      organizer: "IoT Research Lab & City Council",
      theme: "Smart Cities",
      endDate: "2024-04-25",
      startDate: "2024-04-23",
      registrationDeadline: "2024-04-20",
      participants: 134,
      maxParticipants: 180,
      description: "Create IoT solutions for smarter, more sustainable cities of the future.",
      fullDescription:
        "Join the revolution in urban technology by developing Internet of Things (IoT) solutions that make cities smarter, more efficient, and more livable. This 54-hour hackathon challenges participants to create innovative IoT applications addressing urban challenges like traffic management, environmental monitoring, waste management, and citizen services. Work with real sensors, cloud platforms, and city data to build prototypes that could be deployed in actual smart city initiatives.",
      type: "hackathon",
      difficulty: "medium",
      duration: "54 hours",
      status: "upcoming",
      prize: "₹60,000 + Smart City Pilot Program",
      tags: ["IoT", "Smart Cities", "Sensors", "Data Analytics", "Sustainability"],
      progress: 74,
      venue: {
        name: "IoT Innovation Lab",
        address: "Research Block, 2nd Floor",
        capacity: 180,
      },
      tracks: [
        { name: "Traffic & Mobility", description: "Smart transportation and traffic optimization systems" },
        { name: "Environmental Monitoring", description: "Air quality, noise, and environmental sensor networks" },
        { name: "Citizen Services", description: "Digital governance and citizen engagement platforms" },
      ],
      mentors: [
        { name: "Dr. Arun Patel", expertise: "IoT Architecture", company: "SmartCity Solutions" },
        { name: "Meera Joshi", expertise: "Urban Planning", company: "City Development Corp" },
        { name: "Kiran Kumar", expertise: "Sensor Networks", company: "IoT Innovations" },
      ],
      teamSize: { min: 2, max: 4 },
      rules: [
        "Teams of 2-4 members with complementary skills",
        "Must use at least one IoT sensor or device",
        "Solutions should address real urban challenges",
        "Cloud integration and data analytics required",
        "Sustainability considerations are important",
        "Working prototype demonstration mandatory",
      ],
      requirements: [
        "Basic programming skills (Python, JavaScript, or C++)",
        "Understanding of IoT concepts and protocols",
        "Experience with sensors and microcontrollers (Arduino/Raspberry Pi)",
        "Cloud platform familiarity (AWS, Azure, or Google Cloud)",
      ],
      judging: {
        criteria: ["Innovation", "Technical Implementation", "Urban Impact", "Scalability"],
        judges: [
          { name: "Dr. Sunita Sharma", role: "Smart Cities Expert" },
          { name: "Rajesh Gupta", role: "IoT Technology Leader" },
          { name: "Priya Nair", role: "Urban Development Specialist" },
        ],
      },
      timeline: [
        { phase: "Registration Opens", date: "2024-03-01", description: "Team registration and IoT kit allocation" },
        { phase: "Hardware Workshop", date: "2024-04-15", description: "IoT hardware and sensor workshop" },
        { phase: "Registration Deadline", date: "2024-04-20", description: "Final team registration" },
        { phase: "Hackathon Launch", date: "2024-04-23 09:00", description: "Opening ceremony and challenge briefing" },
        {
          phase: "Development Phase",
          date: "2024-04-23-25",
          description: "54 hours of development with mentor support",
        },
        { phase: "Demo Day", date: "2024-04-25 14:00", description: "Live demonstrations and judging" },
        {
          phase: "Awards & Exhibition",
          date: "2024-04-25 17:00",
          description: "Public exhibition and awards ceremony",
        },
      ],
      organizers: [
        { name: "Prof. Vikram Singh", role: "IoT Lab Director", avatar: "/placeholder.svg" },
        { name: "Anjali Sharma", role: "Research Coordinator", avatar: "/placeholder.svg" },
        { name: "City Council", role: "Government Partner", avatar: "/placeholder.svg" },
      ],
    },
    {
      id: "4",
      title: "Quantum Computing & Cryptography Challenge",
      organizer: "Advanced Computing Society",
      theme: "Quantum Technology",
      endDate: "2024-05-30",
      startDate: "2024-05-28",
      registrationDeadline: "2024-05-25",
      participants: 67,
      maxParticipants: 100,
      description: "Explore the frontiers of quantum computing and next-generation cryptographic systems.",
      fullDescription:
        "Dive into the cutting-edge world of quantum computing and cryptography in this advanced 56-hour challenge. Participants will work with quantum simulators, quantum algorithms, and post-quantum cryptographic systems to solve complex computational problems. This event is designed for students interested in the future of computing, quantum mechanics applications, and cybersecurity. Teams will develop quantum algorithms, implement cryptographic protocols, and explore the intersection of quantum computing and machine learning.",
      type: "research-challenge",
      difficulty: "hard",
      duration: "56 hours",
      status: "upcoming",
      prize: "₹80,000 + Research Internship",
      tags: ["Quantum Computing", "Cryptography", "Algorithms", "Security", "Research"],
      progress: 67,
      venue: {
        name: "Quantum Research Center",
        address: "Advanced Computing Block, 4th Floor",
        capacity: 100,
      },
      tracks: [
        { name: "Quantum Algorithms", description: "Developing and optimizing quantum computational algorithms" },
        { name: "Post-Quantum Cryptography", description: "Next-generation cryptographic systems and protocols" },
        { name: "Quantum Machine Learning", description: "ML algorithms adapted for quantum computing platforms" },
      ],
      mentors: [
        { name: "Dr. Quantum Singh", expertise: "Quantum Algorithms", company: "Quantum Research Institute" },
        { name: "Prof. Crypto Patel", expertise: "Cryptography", company: "CyberSecurity Labs" },
        { name: "Dr. ML Sharma", expertise: "Quantum ML", company: "Advanced AI Systems" },
      ],
      teamSize: { min: 2, max: 3 },
      rules: [
        "Teams of 2-3 members with strong mathematical background",
        "Use of quantum simulators and development frameworks required",
        "Focus on theoretical soundness and practical implementation",
        "Research paper submission along with code implementation",
        "Peer review process for final submissions",
        "Open source contribution encouraged",
      ],
      requirements: [
        "Strong background in mathematics and computer science",
        "Understanding of quantum mechanics principles",
        "Programming experience in Python and quantum frameworks (Qiskit, Cirq)",
        "Knowledge of cryptographic concepts and algorithms",
      ],
      judging: {
        criteria: [
          "Theoretical Innovation",
          "Implementation Quality",
          "Research Contribution",
          "Practical Applications",
        ],
        judges: [
          { name: "Dr. Quantum Expert", role: "Quantum Computing Researcher" },
          { name: "Prof. Crypto Master", role: "Cryptography Authority" },
          { name: "Dr. Research Leader", role: "Advanced Computing Director" },
        ],
      },
      timeline: [
        {
          phase: "Registration Opens",
          date: "2024-04-01",
          description: "Team registration and prerequisite assessment",
        },
        { phase: "Quantum Workshop", date: "2024-05-15", description: "Quantum computing fundamentals workshop" },
        { phase: "Cryptography Seminar", date: "2024-05-20", description: "Advanced cryptography concepts seminar" },
        { phase: "Registration Deadline", date: "2024-05-25", description: "Final team confirmation" },
        {
          phase: "Challenge Begins",
          date: "2024-05-28 10:00",
          description: "Problem statements and research challenges released",
        },
        {
          phase: "Research Phase",
          date: "2024-05-28-30",
          description: "56 hours of intensive research and development",
        },
        {
          phase: "Paper Presentations",
          date: "2024-05-30 14:00",
          description: "Research paper presentations and peer review",
        },
        {
          phase: "Awards & Publication",
          date: "2024-05-30 18:00",
          description: "Awards ceremony and research publication opportunities",
        },
      ],
      organizers: [
        { name: "Dr. Advanced Computing", role: "Research Director", avatar: "/placeholder.svg" },
        { name: "Quantum Student Society", role: "Student Organization", avatar: "/placeholder.svg" },
        { name: "Industry Research Partners", role: "Sponsor Mentors", avatar: "/placeholder.svg" },
      ],
    },
  ]

  const challenge = challenges.find((c) => c.id === params.id)

  if (!challenge) {
    return NextResponse.json({ error: "Challenge not found" }, { status: 404 })
  }

  return NextResponse.json(challenge)
}
