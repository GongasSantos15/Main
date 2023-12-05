package Ficha2;

public class UpperToLowerAndViceVersa {

	public static void main(String[] args) {
		char aLowerCase = 'a';
		char aUpperCase = 'A';
		
		aLowerCase -= 32;
		aUpperCase += 32;
		
		System.out.println("LowerCase \"a\" -> " + aLowerCase);
		System.out.println("UpperCase \"A\" -> " + aUpperCase);
	
	}

}
