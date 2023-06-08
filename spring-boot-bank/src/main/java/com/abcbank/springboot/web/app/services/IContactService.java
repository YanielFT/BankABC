package com.abcbank.springboot.web.app.services;

import com.abcbank.springboot.web.app.models.entity.Contact;

import java.util.Date;
import java.util.List;

public interface IContactService {
    public Contact findById(Long id);
    public List<Contact> findAll();
    public void saveContact(Contact contact) throws Exception;
    public void deleteContact(Long id);
    public List<Contact> findByNameAndAddress(String name, String address);
    public List<Contact> rangeBirthday(Date date1, Date date2);
}
