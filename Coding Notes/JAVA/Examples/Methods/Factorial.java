package ficha6;

import java.util.Scanner;

public class Factorial {
	
	static long Factorial(int num) {
		
		long factorial = 1;
		
		for (int i=1; i<=num; i++) {
			factorial *= i;
		}
		return factorial;
	}

	public static void main(String[] args) {
		Scanner input = new Scanner(System.in);
		System.out.print("Introduza um número inteiro para fatorizar: ");
		int num = input.nextInt();

		System.out.printf("\nO número %d! = %d", num, factorial(num));	
		
		input.close();
	}

}
