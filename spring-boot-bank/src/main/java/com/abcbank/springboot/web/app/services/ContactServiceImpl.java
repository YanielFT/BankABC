package com.abcbank.springboot.web.app.services;

import com.abcbank.springboot.web.app.models.entity.Contact;
import com.abcbank.springboot.web.app.models.repository.ContactDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;

@Service
public class ContactServiceImpl implements IContactService{

    @Autowired
    private ContactDao contactDao;

    @Override
    public Contact findById(Long id) {
        return contactDao.findById(id).orElse(null);
    }

    @Override
    public List<Contact> findAll() {
        return (List<Contact>) contactDao.findAll();
    }

    @Override
    public void saveContact(Contact contact) throws Exception {
    contactDao.save(contact);
    }

    @Override
    public void deleteContact(Long id) {
    contactDao.deleteById(id);
    }

    @Override
    public List<Contact> findByNameAndAddress(String name, String address) {
        return contactDao.findByFirstNameAndAddress(name,address);
    }

    @Override
    public List<Contact> rangeBirthday(Date date1, Date date2) {
        return contactDao.findByBirthdayGreaterThanEqualAndBirthdayLessThanEqual(date1,date2);
    }


}
