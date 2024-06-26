package hour;

public class HourTest {

	public static void main(String[] args) {
		// Hour creation
			Hour h1 = new Hour(12, 30, 0);
		//System.out.println(h1);
		
		// Creation of a new hour
			Hour h2 = new Hour(11, 40, 10);
		
		// Use of the compareTo() method:
			if (h2.compareTo(h1) >= 0) {
				System.out.println("Let's lunch!");
			} else {
				System.out.println("Let's get to work!");
			}
			System.out.println();
		
		// Use of the sumHours() method
			h2.sumHours(20);
			System.out.println("Sum Hours: " + h2);
		
		System.out.println();
			
		// Use of the sumMinutes() method
		h2.sumMinutes(70);
		System.out.println("Sum Minutes: " + h2);
		
		System.out.println();
		
		// Use of the sumSeconds() method
		h2.sumSeconds(100);
		System.out.println("Sum Seconds: " + h2);
		
		System.out.println();
		
		// Use of the toSeconds() method
		System.out.println("Hour to Seconds: " + h2.toSeconds());
		
		System.out.println();
		
		// Use of the differenceSeconds() method
		System.out.println("Difference in Seconds: " + h2.differenceSeconds(h1));
		
		System.out.println();
		
		// Use of the clone() method
		System.out.println("Clone: " + h2.clone());
		
		System.out.println();
		
		// Use LocalTime()
		Hour CurrentHour = new Hour();
		
		System.out.println("Current Hour: " + CurrentHour);
	}

}