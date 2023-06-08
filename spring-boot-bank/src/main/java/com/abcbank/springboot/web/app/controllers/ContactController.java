package com.abcbank.springboot.web.app.controllers;

import com.abcbank.springboot.web.app.models.entity.Contact;
import com.abcbank.springboot.web.app.services.IContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.parser.Entity;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1/contacts")
@CrossOrigin
public class ContactController {
    @Autowired
    private IContactService contactService;

    @GetMapping("/")
    public ResponseEntity<List<Contact>> findAll() {
        return new ResponseEntity<>(contactService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contact> findbyId(@PathVariable Long id) {
        return new ResponseEntity<>(contactService.findById(id), HttpStatus.OK);
    }

    @GetMapping("/name/{name}/address/{address}")
    public ResponseEntity<List<Contact>> findByNameAndAddress(@PathVariable String name, @PathVariable String address) {
        return new ResponseEntity<>(contactService.findByNameAndAddress(name,address), HttpStatus.OK);
    }
    @GetMapping("/range/from/{date1}/to/{date2}")
    public ResponseEntity<List<Contact>> findByDateRange(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd")  Date date1,
                                                              @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd")  Date date2) {
        return new ResponseEntity<>(contactService.rangeBirthday(date1,date2), HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<Map<String,String>> save(@RequestBody Contact contact) {
        try {
            contactService.saveContact(contact);
        }catch (Exception e){
            Map<String,String> map = new HashMap<>();
            map.put("message", "Request failed!");
            return new ResponseEntity<>( map, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        Map<String,String> map = new HashMap<>();
        map.put("message", "Contact created");
        return new ResponseEntity<>( map, HttpStatus.OK);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Map<String,String>> edit(@RequestBody Contact contact, @PathVariable Long id) {
        Contact result = contactService.findById(id);
        Map<String,String> map = new HashMap<>();
        if (result == null) {
            map.put("message", "Contact not found");
            return new ResponseEntity<>(map, HttpStatus.NOT_FOUND);
        }
        result.setAddress(contact.getAddress());
        result.setBirthday(contact.getBirthday());
        result.setFirstName(contact.getFirstName());
        result.setLastName(contact.getLastName());
        result.setPhoto(contact.getPhoto());
        result.setPhone(contact.getPhone());
        try {
            contactService.saveContact(result);
        }catch (Exception e){
            map.put("message", "Request failed!");
            return new ResponseEntity<>( map, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        map.put("message", "Contact updated");
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String,String>> deleteEmployee(@PathVariable Long id) {
        Contact contact = contactService.findById(id);
        Map<String,String> map = new HashMap<>();
        if (contact == null) {
            map.put("message", "Contact not found");
            return new ResponseEntity<>(map, HttpStatus.NOT_FOUND);
        }
        contactService.deleteContact(id);
        map.put("message", "Contact deleted");
        return new ResponseEntity<>( map, HttpStatus.OK);
    }
}
