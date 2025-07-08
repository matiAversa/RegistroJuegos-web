package com.adminJuegos.demo.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.query.JSqlParserUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adminJuegos.demo.Entitys.Persona;
import com.adminJuegos.demo.Services.PersonaService;

// DTO para recibir los datos del login
class LoginRequest {
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

    @PostMapping("/login")
    public ResponseEntity<Void> logIn(@RequestBody LoginRequest loginRequest) {
        String mail = loginRequest.getMail();
        String password = loginRequest.getPassword();

        try {
            if (servicioPersona.findByMail(mail) == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404
            }
            if (!servicioPersona.LogIn(mail, password)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 401
            }
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build(); // 204
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // 500
        }
    }


    public boolean registrar(String mail, String password) {
        try {
            Persona p = this.servicioPersona.findByMail(mail);
            if (p == null) {
                return false;
            }
            this.servicioPersona.Registrar(new Persona(mail, password));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return true;

    }


    public Persona findById(Integer id) {
        return servicioPersona.findById(id);
    }

    public Persona findByMail(String mail) {
        return servicioPersona.getPersonaPorMail(mail);
    }

}
