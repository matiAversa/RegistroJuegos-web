package com.adminJuegos.demo.Controllers;

import java.math.BigDecimal;
import java.util.List;

import com.adminJuegos.demo.Services.JuegoService;
import com.adminJuegos.demo.Services.PersonaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.graphql.GraphQlProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import com.adminJuegos.demo.Entitys.*;
import com.adminJuegos.demo.Controllers.JuegoController;
import com.adminJuegos.demo.Services.JuegoJugadoService;
import org.springframework.web.bind.annotation.*;

class cuerpoRequest{

    Integer userId;
    Integer juegoId;


    public cuerpoRequest(){}

    public Integer getIdJuego() {
        return juegoId;
    }

    public void setJuegoId(Integer juegoId) {
        this.juegoId = juegoId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getIdPersona() {
        return userId;
    }
}


@RestController
@RequestMapping("/api")
public class JuegosJugadosController {

    JuegoJugadoService servicioJJ;
    PersonaService ServicePersona;
    JuegoService ServiceJuego;


    @Autowired
    public JuegosJugadosController (JuegoJugadoService servicioJJ, PersonaService ServicePersona, JuegoService ServiceJuego) {
         this.servicioJJ=servicioJJ;
         this.ServicePersona = ServicePersona;
         this.ServiceJuego = ServiceJuego;
    }

    @GetMapping("/JuegosJugados")
    public ResponseEntity<List<DataJuegoJugado>> getJuegosJugados(@RequestParam("userId") Integer userId) {
        try {
            List<DataJuegoJugado> listajuegos = servicioJJ.getJuegosJugados(ServicePersona.findById(userId));
            if (listajuegos != null && !listajuegos.isEmpty()) {
                return ResponseEntity.status(HttpStatus.OK).body(listajuegos);
            }
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/EliminarJuegoJugado")
    public ResponseEntity<Void> eliminarJuegoJugado (@RequestBody cuerpoRequest body){

        try{
            Integer idPersona = body.getIdPersona();
            Integer idJuego = body.getIdJuego();

            boolean delete = this.servicioJJ.DeleteJuegoJugado(idPersona,idJuego);

            if (delete){
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

        }catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    public void addJuegoJugado (Integer idPersona, Integer idJuego, BigDecimal calif){

        this.servicioJJ.saveJuegoJugado(ServicePersona.findById(idPersona), ServiceJuego.findById(idJuego), calif);

    }
}
