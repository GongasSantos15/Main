package Ficha2;

public class TemperatureConversion {

	public static void main(String[] args) {
		
		int temperatureInCelsius = 30;
		float temperatureInFahrenheit = 0f;
		
		temperatureInFahrenheit = 1.8f * temperatureInCelsius + 32;
		
		System.out.println(temperatureInCelsius + "ºC = " + temperatureInFahrenheit + " ºF" );

	}

}
