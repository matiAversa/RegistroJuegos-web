package com.adminJuegos.demo.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.adminJuegos.demo.Entitys.Persona;
import com.adminJuegos.demo.Repositorys.IPersonaRepository;

@Service
public class PersonaService {

    @Autowired
    IPersonaRepository repoPersona;

    public void Registrar (Persona persona){
        this.repoPersona.save(persona);
    } 

    public Persona LogIn (String mail, String password) throws Exception{
        Persona p = repoPersona.findByMail(mail);
        if (p == null){
            return null;
        }
        String passDelMail = p.getPassword();
        return passDelMail.equals(password) ? p : null;
    }

    public Persona findByMail (String mail){
        return this.repoPersona.findByMail(mail);
    }

    public Persona findById (Integer id){
        return repoPersona.findById(id).orElse(null);
    }

    public Persona getPersonaPorMail ( String mail){
        return repoPersona.findByMail(mail);
    }



}
