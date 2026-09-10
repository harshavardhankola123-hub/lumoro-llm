export interface TableColumn {
  key: string;
  label: string;
  isStatus?: boolean;
}

export const programsData = {
  title: "Programs",
  description: "Manage learning paths and course structures.",
  columns: [
    { key: "id", label: "Program ID" },
    { key: "title", label: "Title" },
    { key: "duration", label: "Duration" },
    { key: "status", label: "Status", isStatus: true }
  ],
  data: [
    { id: "PRG-001", title: "Forge Data Analyst", duration: "12 Weeks", status: "Active" },
    { id: "PRG-002", title: "Full Stack Developer", duration: "24 Weeks", status: "Active" },
    { id: "PRG-003", title: "UI/UX Design", duration: "8 Weeks", status: "Draft" }
  ]
};

export const batchesData = {
  title: "Batches",
  description: "Schedule and manage learning cohorts.",
  columns: [
    { key: "id", label: "Batch ID" },
    { key: "program", label: "Program" },
    { key: "start_date", label: "Start Date" },
    { key: "students", label: "Students" },
    { key: "status", label: "Status", isStatus: true }
  ],
  data: [
    { id: "BCH-04", program: "Full Stack Developer", start_date: "Sep 01, 2025", students: "42", status: "Active" },
    { id: "BCH-05", program: "Forge Data Analyst", start_date: "Oct 15, 2025", students: "28", status: "Upcoming" },
    { id: "BCH-03", program: "UI/UX Design", start_date: "Jan 10, 2025", students: "35", status: "Completed" }
  ]
};

export const enrollmentsData = {
  title: "Enrollments",
  description: "Manage student course registrations.",
  columns: [
    { key: "student", label: "Student" },
    { key: "program", label: "Program" },
    { key: "batch", label: "Batch" },
    { key: "date", label: "Enrollment Date" },
    { key: "status", label: "Status", isStatus: true }
  ],
  data: [
    { student: "Sarah Miller", program: "Full Stack Developer", batch: "BCH-04", date: "Aug 20, 2025", status: "Active" },
    { student: "John Doe", program: "Forge Data Analyst", batch: "BCH-05", date: "Oct 01, 2025", status: "Active" },
    { student: "Emma Watson", program: "UI/UX Design", batch: "BCH-03", date: "Dec 15, 2024", status: "Completed" }
  ]
};

export const mentorsData = {
  title: "Mentors",
  description: "Manage faculty and mentor assignments.",
  columns: [
    { key: "name", label: "Name" },
    { key: "expertise", label: "Expertise" },
    { key: "active_students", label: "Active Students" },
    { key: "rating", label: "Rating" },
    { key: "status", label: "Status", isStatus: true }
  ],
  data: [
    { name: "Alex Morgan", expertise: "Database & Backend", active_students: "128", rating: "4.9/5", status: "Active" },
    { name: "Jane Smith", expertise: "Frontend React", active_students: "95", rating: "4.8/5", status: "Active" },
    { name: "Robert Chen", expertise: "Data Science", active_students: "45", rating: "4.7/5", status: "On Leave" }
  ]
};

export const curriculumData = {
  title: "Curriculum",
  description: "Design and update course materials.",
  columns: [
    { key: "module", label: "Module Name" },
    { key: "program", label: "Program" },
    { key: "lessons", label: "Lessons" },
    { key: "status", label: "Status", isStatus: true }
  ],
  data: [
    { module: "React State Management", program: "Full Stack Developer", lessons: "12", status: "Published" },
    { module: "SQL Indexing", program: "Forge Data Analyst", lessons: "8", status: "Published" },
    { module: "Figma Prototyping", program: "UI/UX Design", lessons: "15", status: "Draft" }
  ]
};

export const assessmentsData = {
  title: "Assessments",
  description: "Configure quizzes and practical tasks.",
  columns: [
    { key: "title", label: "Title" },
    { key: "program", label: "Program" },
    { key: "type", label: "Type" },
    { key: "status", label: "Status", isStatus: true }
  ],
  data: [
    { title: "Mid-Term Project", program: "Full Stack Developer", type: "Practical", status: "Active" },
    { title: "SQL Query Quiz", program: "Forge Data Analyst", type: "Quiz", status: "Active" },
    { title: "Final Design Review", program: "UI/UX Design", type: "Review", status: "Draft" }
  ]
};

export const paymentsData = {
  title: "Payments",
  description: "Manage transactions and subscriptions.",
  columns: [
    { key: "txn_id", label: "Transaction ID" },
    { key: "student", label: "Student" },
    { key: "amount", label: "Amount" },
    { key: "date", label: "Date" },
    { key: "status", label: "Status", isStatus: true }
  ],
  data: [
    { txn_id: "TXN-8472", student: "Sarah Miller", amount: "$499.00", date: "Aug 20, 2025", status: "Paid" },
    { txn_id: "TXN-8473", student: "John Doe", amount: "$399.00", date: "Oct 01, 2025", status: "Paid" },
    { txn_id: "TXN-8474", student: "Emma Watson", amount: "$299.00", date: "Dec 15, 2024", status: "Refunded" }
  ]
};

export const notificationsData = {
  title: "Notifications",
  description: "System alerts and communication.",
  columns: [
    { key: "message", label: "Message" },
    { key: "target", label: "Target Audience" },
    { key: "date", label: "Date Sent" },
    { key: "status", label: "Status", isStatus: true }
  ],
  data: [
    { message: "Platform Maintenance Scheduled", target: "All Users", date: "Sep 09, 2026", status: "Sent" },
    { message: "New Module Available", target: "Full Stack Students", date: "Sep 08, 2026", status: "Sent" },
    { message: "Batch 05 Registration Open", target: "Leads", date: "Sep 05, 2026", status: "Scheduled" }
  ]
};
