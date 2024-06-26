package exercicio2;

public class TestePessoa {

	public static void main(String[] args) {
		
		// Inicialize p using the Person class
			Person p = new Person();
			p.setName("Me");
			p.setAddress("My Address");
			p.setPostalCode("My Postal Code");
			p.setPhoneNumber("My Phone Number");
			p.setBirthDay(00);
			p.setBirthMonth(01);
			p.setBirthYear(2002);
			p.setCivilState('s');
			
			// Print using only the Person class
			System.out.println( p );
			
			// Print of each attribute of the Person class
				System.out.printf( "Name: %s\n", p.getName() );
				System.out.printf( "Address: %s\n", p.getAddress() );
				System.out.printf( "Civil State: %c\n", p.getCivilState() );
	}

}