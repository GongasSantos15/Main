package person;

public class Main {
	
	// Method to print people
		public static void printPeople(Person people[]) {
			for (int i = 0; i < people.length; i++) {
				System.out.println(people[i] + "\n");
			}
		}
		
	// Method to print people of legal age
		public static void printPeopleLegalAge(Person people[], int referenceYear) {
			
			// For each
			for (Person p : people) {
				if (p.isLegalAge(referenceYear)) {
					System.out.println(p + "\n");
				}
			}
		}
		
	// Method to print people given a certain civil state
		public static void printPeopleGivenCivilState(Person people[], char civilState) {
			for (Person p : people) {
				if (p.getCivilState() == civilState) {
					System.out.println(p + "\n");
				}
			}
		}
		
	// Method to print people given a certain postal code
			public static void printPeopleGivenPostalCode(Person people[], String postalCode) {
				for (Person p : people) {
					if (p.getPostalCode().equals(postalCode)) {
						System.out.println(p + "\n");
					}
				}
			}
		
	// Method to print People with a certain letter
		public static void printPeopleLetter(Person people[], String name) {
			for (Person p : people) {
				if (p.getName().contains(name)) {
					System.out.println(p + "\n");
				}
			}
		}
		
	// Method to print People given a certain PhoneNumber
		public static void printNameAddressGivenPhoneNumber(Person people[], String phoneNumber) {
			for (Person p : people) {
				if (p.getPhoneNumber().equals(phoneNumber)) {
					System.out.println("Name:\t" + p.getName() + "\n" + "Address:\t" + p.getAddress() + "\n");
				}
			}
		}

	public static void main(String[] args) {
		
		// Creation of an array to store people's data
		Person people[] = new Person[5];
		
		// First Person
			// Initialize the first person
				people[0] = new Person();
		
			// First Person Data
				people[0].setName("Pedro First");
				people[0].setAddress("Av. 1berto Delgado, nº 1");
				people[0].setPostalCode("6000-001 CB");
				people[0].setPhoneNumber("272000001");
				people[0].setBirthDay(11);
				people[0].setBirthMonth(1);
				people[0].setBirthYear(2001);
				people[0].setCivilState('s');
			
		// Second Person
			// Initialize the second person
			people[1] = new Person();
	
			// Second Person Data
				people[1].setName("Dulce Dois");
				people[1].setAddress("Rua Duque Segundo");
				people[1].setPostalCode("6000-002 CB");
				people[1].setPhoneNumber("272000002");
				people[1].setBirthDay(22);
				people[1].setBirthMonth(12);
				people[1].setBirthYear(1962);
				people[1].setCivilState('c');
		
		// Third Person
			// Initialize the third person
				people[2] = new Person();
	
			// Third Person Data
				people[2].setName("Teresa Três");
				people[2].setAddress("Avenida dos 3 globos");
				people[2].setPostalCode("6000-003 CB");
				people[2].setPhoneNumber("272000003");
				people[2].setBirthDay(13);
				people[2].setBirthMonth(3);
				people[2].setBirthYear(2013);
				people[2].setCivilState('d');
		
		// Fourth Person
			// Initialize the fourth person
				people[3] = new Person();
	
			// Fourth Person Data
				people[3].setName("Quim Quadras");
				people[3].setAddress("Rua Quarta, nº 4");
				people[3].setPostalCode("6000-004 CB");
				people[3].setPhoneNumber("272000004");
				people[3].setBirthDay(4);
				people[3].setBirthMonth(4);
				people[3].setBirthYear(2004);
				people[3].setCivilState('v');
				
		// Fifth Person
			// Initialize the fifth person
				people[4] = new Person();
		
			// Fifth Person Data
					people[4].setName("Paulo Penta");
					people[4].setAddress("Quinta da Granja, nº 5");
					people[4].setPostalCode("6000-005 CB");
					people[4].setPhoneNumber("272000005");
					people[4].setBirthDay(25);
					people[4].setBirthMonth(5);
					people[4].setBirthYear(1995);
					people[4].setCivilState('u');
					
		// Print 5 people
			printPeople(people);
					
		// Print people of legal age
			printPeopleLegalAge(people, 2024);
			
		// Print people given a certain civil state
			printPeopleGivenCivilState(people, 's');
		
		// Print people given a certain letter
			printPeopleLetter(people, "T");
					
		// Print the name, address given a certain phone number
			printNameAddressGivenPhoneNumber(people, "272000005");
			
	}	

}