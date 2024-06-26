package exercicio5;

import exercicio4.Hour;

public class TestePeriodo {

	public static void main(String[] args) {
		
		// Creation of the 1st period, creating 2 hours outside the variable
			Hour h1 = new Hour(8,30,0);
			Hour h2 = new Hour(10,30,0);
			Period p1 = new Period(h1, h2);
			System.out.println(p1);
		
		// Creation of the 2nd period, creating 2 hours inside the variable (it takes less memory)
			Period p2 = new Period(new Hour(10,30,0), new Hour(12,30,0));
			System.out.println(p2);
			
		// setInitial() 
			p2.setInitial(new Hour(9,30,0));
			System.out.println("\n------ Changing the initial hour: ------");
			System.out.println(p2);
			
		// setFinal()
			p2.setFinal(new Hour(15,30,0));
			System.out.println("\n ------ Changing the final hour ------");
			System.out.println(p2);
			
		// Period(initial, duration)
			Period p3 = new Period(new Hour(12,30,0), hour.SECONDS_HOUR);
			System.out.println("\n ------ New Period(initial, duration) ------");
			System.out.println(p3);
			
		// duration()
			System.out.println("\n ------ Calculate the duration ------");
			System.out.println(p3.duration() + " segundos");
			
		// contain()
			System.out.println("\n ------ Chcek if the hour is in the period ------");
			System.out.println(p3.isIn(new Hour(12,29,59)));
			
		// intersect()
			System.out.println("\n ------ Check if the period intersect another ------");
			System.out.println(p3.intersect(p2));
			
		// contain()
			System.out.println("\n ------ Check if the period contains another ------");
			System.out.println(p3.contain(p1));
	}

}