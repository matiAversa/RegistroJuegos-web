package com.adminJuegos.demo.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adminJuegos.demo.Entitys.Persona;
import com.adminJuegos.demo.Services.PersonaService;

// DTO para recibir los datos del login
class UserRequest {
    private String mail;
    private String password;


    // Getters y setters
    public String getMail() { return mail; }
    public void setMail(String mail) { this.mail = mail; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }


}

@RestController
@RequestMapping("/api")
public class PersonaController {

    private final PersonaService servicioPersona;

    @Autowired
    public PersonaController(PersonaService servicioPersona) {
        this.servicioPersona = servicioPersona;
    }

    public Persona findById(Integer id) {
        return servicioPersona.findById(id);
    }

    public Persona findByMail(String mail) {
        return servicioPersona.getPersonaPorMail(mail);
    }

}
