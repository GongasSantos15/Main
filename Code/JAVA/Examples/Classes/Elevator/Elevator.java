package elevator;

public class Elevator {

	// Create 3 variables:  lowerFloor, upperFloor and currentFloor
		private int lowerFloor;
		private int upperFloor;
		private int currentFloor;

	// Constructor which receives 3 varaibles: lowerFloor, upperFloor and currentFloor
		public Elevator(int lowerFloor, int currentFloor, int upperFloor) {
		
		// Validations
			if(lowerFloor < upperFloor) {
				this.lowerFloor = lowerFloor;
				this.upperFloor = upperFloor;
			} else {
				this.lowerFloor = upperFloor;
				this.upperFloor = lowerFloor;
			}
			
			if (access(currentFloor)) {
				this.currentFloor = currentFloor;
			} else {
				// Solution currentFloor = lowerFloor
					this.currentFloor = this.lowerFloor;
				
				// Solution to put the current floor in between the 2 floors (lower and upper)
					//this.currentFloor = (this.upperFloor + this.lowerFloor) / 2;
					
				// Solution to put the currentFloor at the end of one of the floors (lower and upper)
					//this.currentFloor = currentFloor > this.upperFloor ? this.upperFloor : this.lowerFloor;
			}	
			
	}

	// Constructor which receives 3 varaibles: lowerFloor and upperFloor
		public Elevator(int lowerFloor, int upperFloor) {
			
			// Validations: calls to the first constuctor created
				this(lowerFloor, lowerFloor, upperFloor);			
		
		}

	// Constructor which receives 1 varaible: upperFloor 
		public Elevator(int upperFloor) {
			
			// Validations
				this(0, 0, upperFloor);
		}

			
	// Methods
		// Makes the elevator go up one floor
			public void goUp() {
				if (!atTop()) {
					currentFloor++;
				}
			}
			
		// Makes the elevator go down one floor
			public void goDown() {
				if (!atBottom()) {
					currentFloor--;
				}
				
			}
			
		// Makes the elevator go to the floor refered (this elevator only goes up or down one floor at the time)
			public void goTo(int floor) {
				if(!access(floor) || floor == getCurrentFloor()) {
					return;
				} 
				
				while(getCurrentFloor() < floor) {
					goUp();
				}
				
				while(getCurrentFloor() > floor) {
					goDown();
				}
			}
			
		// Given one floor this method indicates if the elevator are at the top
			public boolean atTop() {
				return getCurrentFloor() == getUpperFloor();
			}

		// Given one floor this method indicates if the elevator are at the bottom
			public boolean atBottom() {
				return getCurrentFloor() == getLowerFloor();
			}
		
		// Indicates if the floor given is accessed by the elevator
			public boolean access(int floor) {
				return floor >= getLowerFloor() && floor <= getUpperFloor();
			}
			
	
	// Getters and Setters
		public int getLowerFloor() {
			return lowerFloor;
		}
		public void setLowerFloor(int lowerFloor) {
			if (lowerFloor <= currentFloor) {
				this.lowerFloor = lowerFloor;
			}
		}
		
		public int getCurrentFloor() {
			return currentFloor;
		}
		public void setCurrentFloor(int currentFloor) {
			if (access(currentFloor)) {
				this.currentFloor = currentFloor;
			}
		}

		public int getUpperFloor() {
			return upperFloor;
		}
		public void setUpperFloor(int upperFloor) {
			if (currentFloor <= upperFloor) {
				this.upperFloor = upperFloor;
			}
		}
		
		
	// toString
		@Override
		public String toString() {
			return "Elevator [" + lowerFloor + " | " + currentFloor + " | "+ upperFloor + "]";
		}
		
}