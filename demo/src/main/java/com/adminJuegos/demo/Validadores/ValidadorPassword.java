package com.adminJuegos.demo.Validadores;

public class ValidadorPassword {
    
    public static String validar (String password){

     if (password.length() < 6){
        return "La contraseña debe tener como minimo 6 caracteres.";
     }

     if (!password.matches(".*\\d.*")){
        return "La contraseña debe tener por lo menos un numero.";
     }

     return "ok";
     
    }

}
