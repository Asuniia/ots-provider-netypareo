import {
  BaseTimetableProvider,
  type Course,
  type ProviderCredentials,
  type School,
} from "@studentsphere/ots-core";

export class ExampleProvider extends BaseTimetableProvider {
  get id(): string {
    return "provider-example";
  }

  get name(): string {
    return "Demo Provider";
  }

  get logo(): string {
    return "https://placehold.co/400x400/EEE/31343C?text=Demo";
  }

  get schools(): School[] {
    return [
      {
        id: "demo",
        name: "Demo",
        logo: "https://placehold.co/400x400/EEE/31343C",
      },
    ];
  }

  /**
   * Mock validation logic.
   * Accepts identifier: 'student' and password: 'password123'
   */
  async validateCredentials(
    credentials: ProviderCredentials,
  ): Promise<boolean> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    if (
      credentials.identifier === "student" &&
      credentials.password === "password123"
    ) {
      return true;
    }
    return false;
  }

  /**
   * Generates mock courses for the requested range.
   */
  async getSchedule(
    credentials: ProviderCredentials,
    from: Date,
    to: Date,
  ): Promise<Course[]> {
    // Validate again if needed, or assume verified
    if (credentials.identifier !== "student") {
      throw new Error("Invalid credentials");
    }

    // Simulate scraping delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const courses: Course[] = [];
    const currentDate = new Date(from);

    // Generate a simple schedule: Math at 8am, Physics at 10am every day in range
    while (currentDate < to) {
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        // Skip weekends
        // Course 1: Math
        const mathStart = new Date(currentDate);
        mathStart.setHours(8, 0, 0, 0);
        const mathEnd = new Date(currentDate);
        mathEnd.setHours(10, 0, 0, 0);

        courses.push({
          hash: `math-${mathStart.getTime()}`,
          subject: "Mathématiques",
          start: mathStart,
          end: mathEnd,
          location: "Salle 101",
          teacher: "M. Euler",
          color: "#3b82f6", // blue
        });

        // Course 2: Physics
        const physStart = new Date(currentDate);
        physStart.setHours(10, 15, 0, 0);
        const physEnd = new Date(currentDate);
        physEnd.setHours(12, 15, 0, 0);

        courses.push({
          hash: `phys-${physStart.getTime()}`,
          subject: "Physique",
          start: physStart,
          end: physEnd,
          location: "Labo 2",
          teacher: "Mme Curie",
          color: "#ef4444", // red
        });
      }
      // Next day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return courses;
  }
}
