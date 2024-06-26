package period;

import hour.Hour;

public class Period {
	
	// Variables
		private Hour initial, final;

	// Constructor which initializes the initial and final hour
		public Period(Hour initial, Hour final) {
			
			// General Check
				if (initial.compareTo(final) <= 0) {		// initial <= final does't work to compare 2 objects, use the compareTo() method
					this.initial = initial;
					this.final = final;
				} else {
					this.initial = final;
					this.final = initial;
				}
		}
		
	// Constructor which initializaes the initial hour and a duration (in seconds)
		public Period(Hour initial, int duration) {
			
			// Validação geral
				if (duration >= 0) {
					this.initial = initial;
					final = initial.clone();	// Use the clone() method to declare an object equal to the initial, but not exactly the same object
					final.sumSeconds(duration);
				}
		}
		
	/* Methods */
		
		// Method which returns the duration of the period in seconds
			public int duration() {
				return final.secondsDiff(initial);
			}
		
		// Method which indicates if a given hour is in the period
			public boolean isIn(Hour h) {
				return initial.compareTo(h) <= 0 && final.compareTo(h) >= 0 ? true : false;
			}
			
		// Method that indicates if this period intersects another period
			public boolean intersect(Period p) {
				return p.initial.compareTo(final) > 0 || p.final.compareTo(initial) < 0 ? false : true;
			}
			
		// Method that indicates if this perido contains another period
			public boolean contain(Period p) {
				return initial.compareTo(p.initial) >= 0 && final.compareTo(p.final) <= 0 ? true : false;
			}
		
		// Method that joint this period to another, as long as they intersect
//			public Period joint(Period p) {
//				
//			}
			
		// Method that returns a period which is an union of this period with another
			
			
		// Method that returns a period, which is an intersection of this period with another
			

	// Getters and Setters
		public Hour getInitial() {
			return initial;
		}
	
		public void setInitial(Hour initial) {
			// Check if initial <= final
				if (initial.compareTo(final) <= 0) {
					this.initial = initial;
				}
		}
	
		public Hour getFinal() {
			return final;
		}
	
		public void setFinal(Hour final) {
			
			// Check if final >= initial
				if(final.compareTo(initial) >= 0) {
					this.final = final;
				}
		}

		
	// ToString
		@Override
		public String toString() {
			return "Period: " + initial + " until " + final;
		}

		
}