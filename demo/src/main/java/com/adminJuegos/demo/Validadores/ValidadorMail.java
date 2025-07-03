package com.adminJuegos.demo.Validadores;

import com.adminJuegos.demo.Controllers.PersonaController;

public class ValidadorMail {
    
    public static String validar (String mail){

        if (mail.isEmpty()){
            return "Se debe ingresar un mail valido.";
        }

        if (mail.contains("@") || mail.contains(".")){
            return "Se debe ingresar un mail valido.";
        }

        if (new PersonaController().findByMail(mail) != null){
            return "El mail ingresado ya se encuentra registrado en el sistema.";
        }

        return "ok";
    }

}
