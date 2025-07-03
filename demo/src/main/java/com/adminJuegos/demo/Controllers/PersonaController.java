package com.adminJuegos.demo.Controllers;

import org.springframework.stereotype.Controller;
import com.adminJuegos.demo.Entitys.Persona;
import com.adminJuegos.demo.Services.PersonaService;

@Controller
public class PersonaController {

    PersonaService servicioPersona;

    public boolean LogIn(String mail, String password) {
        boolean sePudo = false;
        try {
            sePudo = this.servicioPersona.LogIn(mail, password);
        } catch (Exception e) {
            System.out.println(e);
        }
        return sePudo;

    }

    public boolean registrar(String mail, String password) {
        Integer p = -1;
        try {
            p = this.servicioPersona.findByMail(mail);
            if (p == -1){
                return false;
            }
            this.servicioPersona.Registrar(new Persona (mail, password));
        } catch (Exception e) {
            System.out.println(e);
        }
        return true;

    }

    public Integer getId (String mail){
        return this.servicioPersona.findByMail(mail);
    }

    public Persona findById (Integer id ){
        return servicioPersona.findById(id);
    }

    public Persona findByMail (String mail){
        return servicioPersona.getPersonaPorMail(mail);
    }

}
