package com.abcbank.springboot.web.app.models.repository;

import com.abcbank.springboot.web.app.models.entity.Contact;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;

public interface ContactDao extends CrudRepository<Contact, Long> {
    public List<Contact> findByFirstNameAndAddress(String firstName, String address);
    public List<Contact> findByBirthdayGreaterThanEqualAndBirthdayLessThanEqual(Date firstDate, Date secondDate);
}
