package elevator;

public class ElevatorTest {

	public static void main(String[] args) {
		// Creation of an elevator with lower floor = -3, current floor = 5 and upper floor = 10
			Elevator e1 = new Elevator(-3, 5, 10);
			System.out.println(e1);
			
		// Creation of an elevator with lower floor = -1 and upper floor = 12
			Elevator e2 = new Elevator(-1, 12);
			System.out.println(e2);
		
		// Creation of an elevator with upper floor = 4
			Elevator e3 = new Elevator(4);
			System.out.println(e3);
			
			System.out.println();
			
		// Change the lower floor:
			e1.setLowerFloor(3);
			System.out.println("Changing the lower floor: " + e1);
				
		// Mudar o andar atual:
			e1.setCurrentFloor(3);
			System.out.println("Changing the current floor: " + e1);
			
		// Mudar o andar superior:
			e1.setUpperFloor(2);
			System.out.println("Changing the upper floor: " + e1);
			
		System.out.println();
			
		// Check if the elevator is at the top:
			System.out.println("Is at the top: "+ e1.atTop());
			
		// Check if the elevator is at the bottom:
			System.out.println("Is at the bottom: "+ e1.atBottom());
			
		// Check if the elevator can access a floor:
			System.out.println("Can access a floor: " + e1.access(7));
			
		// Check if the elevator goes up:
			e1.goUp();
			System.out.println("The elevator goes up to the floor: " + e1.getCurrentFloor());
			
		// Check if the elevator goes down:
			e1.goDown();
			System.out.println("The elevator goes down to the floor: " + e1.getCurrentFloor());
			
		// For the elevator goes up and down n floors use for:
//			for(int i = 0; i < n; i++) {
//				e1.goUp(); ou e1.goDown();
//			}
			
		// Check if the elevator goes to a given floor:
			e1.goTo(7);
			System.out.println("The elevator went to the floor: " + e1.getCurrentFloor());
	}

}