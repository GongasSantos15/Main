package exercicio2;

public class Pessoa {
	
	// Criação das variáveis da classe em private
		private String name;
		private String address;
		private String postalCode;
		private String phoneNumber;
		private int birthDay, birthMonth, birthYear;
		private char civilState;

	// Getters and Setters: 
		// Name
			public String getName() {
				return name;
			}
			public void setName ( String n ) {
				if (n != null && !n.isBlank()) {
					name = n;
				} else {
					name = "John Doe";
				}
			}
		
		// Birth Day
			public int getBirthDay() {
				return birthDay;
			}
			public void setBirthDay ( int bd ) {
				birthDay = bd;
			}
		
		// Civil State
			public char getCivilState() {
				return civilState;
			}
			public void setCivilState ( char cs ) {
				char csl = Character.toLowerCase(cs);
				if (csl == 's' || csl == 'm' || csl == 'd' || csl == 'w' || csl == 'p') {
					civilState = csl;
				} else {
					civilState = '?';
				}
			}
		
		// Address
			public String getAddress() {
				return address;
			}
			public void setAddress(String a) {
				this.address = a;
			}
			
		// Postal Code
			public String getPostalCode() {
				return postalCode;
			}
			public void setPostalCode(String pc) {
				this.postalCode = pc;
			}
			
		// Phone Number
			public String getPhoneNumber() {
				return phoneNumber;
			}
			public void setPhoneNumber(String pn) {
				this.phoneNumber = pn;
			}
			
		// Birth Month
			public int getBirthMonth() {
				return birthMonth;
			}
			public void setBirthMonth(int bm) {
				this.birthMonth = bm;
			}
			
		// Birth Year
			public int getBirthYear() {
				return birthYear;
			}
			public void setBirthYear(int by) {
				this.birthYear = by;
			}
			
	// toSting()
		@Override
		public String toString() {
			return "Name:\t\t\t" + name + 
					"\nAddress:\t\t\t" + address + 
					"\nPostal Code:\t\t" + postalCode + 
					"\nPhone Number:\t\t\t" + phoneNumber + 
					"\nBirth Date:\t" + birthDay + "/" + birthMonth + "/" + birthYear + 
					"\nCivil State:\t\t" + getCivilStateFull() + 
					"\nAge:\t\t\t" + getAge(2023) + 
					"\nIs of Legal Age:\t" + eMaiorIdade(2024);
		}
		
	// Method to obtain civil state in full
		public String getCivilStateFull() {
			switch (civilState) {
				case 's': return "Single";
				case 'm': return "Married";
				case 'd': return "Divorciado";
				case 'w': return "Widow(ed)";
				case 'p': return "Non-Martial Partnership";
				default: return "???";
			}
		}
		
	// Método para calcular a idade de uma pessoa com base no ano de referência
		public int getAge(int referenceYear) {
			return referenceYear > birthYear ? referenceYear - birthYear : -1;
		}
		
	// Método para verifiar se é maior de idade	
		public boolean isLegalAge(int referenceYear) {
			return getAge(referenceYear) >= 18;
		}
 	
}