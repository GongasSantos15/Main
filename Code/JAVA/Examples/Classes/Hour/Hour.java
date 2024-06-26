package hour;

import java.time.LocalTime;

public class Hour {
	
	// Declaration of the constants to be used :
	// The constants MUST always be with UPPERCASE LETTERS and separated by '_' and with final
		// Hour
			public static final int HOURS_DAY = 24;
			public static final int HOURS_MAX = HOURS_DAY - 1; // HOURS_DAY - 1 -> 24 - 1 = 23
		
		// minutes
			public static final int MINUTES_HOUR = 60;
			public static final int MINUTES_MAX = MINUTES_HOUR - 1;
			public static final int MINUTES_DAY = MINUTES_HOUR * HOURS_DAY;
			
		// seconds
			public static final int SECONDS_MINUTE = 60;
			public static final int SECONDS_MAX = SECONDS_MINUTE - 1;
			public static final int SECONDS_HOUR = SECONDS_MINUTE * MINUTES_HOUR;
			public static final int SECONDS_DAY = SECONDS_HOUR * HOURS_DAY;
	
	// 1st - Variables
		private int hours, minutes, seconds;
	
	// 2nd - Constructor
		public Hour(int hours, int minutes, int seconds) {

			// In this class, we can use the setters in the constructor, because the variables are independents between each other, unlike the Elevator class
			setHours(hours);
			setMinutes(minutes);
			setSeconds(seconds);
		}
	
		public Hour() {
			LocalTime CurrentHour = LocalTime.now();
			hours = CurrentHour.getHour();
			minutes = CurrentHour.getMinute();
			seconds = CurrentHour.getSecond();
		}

	// 3rd - Getters (obtain the variables value) and Setters (cahnge the variables value)
		// Hours
			public int getHours() {
				return hours;
			}
	
			public void setHours(int hours) {
				// For the SETTER to be called by the constructor, this has to return some value, it just can't be ignored, it has to initialize the variable ALWAYS
				
				// If the hour is less than 0, return 0, if is greater than 23, return 23, else return the value of the hour variable
					if (Hours < 0) {
						this.hours = 0;
					} else if (Hours >= HOURS_DAY) {
						this.hours = HOURS_MAX; 
					} else {
						this.hours = hours;
					}
			}
		
		// Minutes
			public int getMinutes() {
				return minutes;
			}
	
			public void setMinutes(int minutes) {
				if (minutes < 0) {
					this.minutes = 0;
				} else if (minutes >= MINUTES_HOUR) {
					this.minutes = MINUTES_MAX;
				} else {
					this.minutes = minutes;
				}
			}

		// Seconds
			public int getSeconds() {
				return seconds;
			}
		
			public void setSeconds(int seconds) {
				if (seconds < 0) {
					this.seconds = 0;
				} else if (seconds >= SECONDS_MINUTE) {
					this.seconds = SECONDS_MAX;
				} else {
					this.seconds = seconds;
				}
			}
	
	// 4th - toString
		@Override
		public String toString() {
			// Put the hour in this format 0H:0M:0S if it doesn't have 2 digits
			return String.format("%02d:%02d:%02d", hours, minutes, seconds);
		}
	
	// 5th - Methods
		public void sumHours(int numHours) {
			this.hours += numHours;
			if (this.hours >= HOURS_DAY) {
				hours %= HOURS_DAY;
			}
		}
		
		public void sumMinutes(int numMinutes) {
			int totalMinutes = minutes + numMinutes;
			this.minutes = totalMinutes % MINUTES_HOUR;
			sumHours(totalMinutes / MINUTES_HOUR);	
		}
		
		public void sumSeconds(int numSeconds) {
			int totalSeconds = seconds + numSeconds;
			this.seconds = totalSeconds % seconds_MINUTO;
			sumMinutes(totalseconds / seconds_MINUTO);
		}
		
		public int toSeconds() {
			return this.hours * SECONDS_HOUR + this.minutes * SECONDS_MINUTE + this.seconds;
		}
		
		public int differenceSeconds(Hour anotherHour) {
			return toSeconds() - anotherHour.toSeconds();
		}
		
		public Hour clone() {
			return new Hour(getHours(), getMinutes(), getSeconds());
		}
		
		public int compareTo(Hour anotherHour) {
			if (this.hours != anotherHour.hours) {
				return this.hours - anotherHour.hours;
			} 
			if (this.minutes != anotherHour.minutes) {
				return this.minutes - anotherHour.minutes;
			}
			return this.seconds - anotherHour.seconds;
		}
}