package com.onlineshopping.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.onlineshopping.dao.AddressDao;
import com.onlineshopping.dao.UserDao;
import com.onlineshopping.dto.AddUserRequest;
import com.onlineshopping.dto.AddWalletRequest;
import com.onlineshopping.dto.UserLoginRequest;
import com.onlineshopping.model.Address;
import com.onlineshopping.model.Cart;
import com.onlineshopping.model.User;

@RestController
@RequestMapping("api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private AddressDao addressDao;
	
	@PostMapping("register")
	public ResponseEntity<?> registerUser(@RequestBody AddUserRequest userRequest) {
		System.out.println("recieved request for REGISTER USER");
		System.out.println(userRequest);
		
		Address address = new Address();
		address.setCity(userRequest.getCity());
		address.setPincode(userRequest.getPincode());
		address.setStreet(userRequest.getStreet());
		
		Address addAddress = addressDao.save(address);
		
		User user = new User();
		user.setAddress(addAddress);
		user.setEmailId(userRequest.getEmailId());
		user.setFirstName(userRequest.getFirstName());
		user.setLastName(userRequest.getLastName());
		user.setPhoneNo(userRequest.getPhoneNo());
		user.setPassword(userRequest.getPassword());
		user.setRole(userRequest.getRole());
		
		if(user.getRole().equals("Customer")) {
			user.setAmount(1000.00);
		}
		
		User addUser = userDao.save(user);
		
		System.out.println("response sent!!!");
		return ResponseEntity.ok(addUser);
	}
	
	@PostMapping("login")
	public ResponseEntity<?> loginUser(@RequestBody UserLoginRequest loginRequest) {
		System.out.println("recieved request for LOGIN USER");
		System.out.println(loginRequest);
		
		User user = new User();
		user = userDao.findByEmailIdAndPasswordAndRole(loginRequest.getEmailId(), loginRequest.getPassword(), loginRequest.getRole());
		
		System.out.println(user);
		System.out.println("response sent!!!");
		return ResponseEntity.ok(user);
	}
	
	@GetMapping("deliveryperson/all")
	public ResponseEntity<?> getAllDeliveryPersons() {
		System.out.println("recieved request for getting ALL Delivery Persons!!!");
		
		List<User> deliveryPersons = this.userDao.findByRole("Delivery");
		
		System.out.println("response sent!!!");
		return ResponseEntity.ok(deliveryPersons);
	}
	
	@GetMapping("manager/all")
	public ResponseEntity<?> getAllManager() {
		System.out.println("recieved request for getting ALL Managers!!!");
		
		List<User> deliveryPersons = this.userDao.findByRole("Manager");
		
		System.out.println("response sent!!!");
		return ResponseEntity.ok(deliveryPersons);
	}
	
	@GetMapping("manager/remove")
	public ResponseEntity removeManager(@RequestParam("userId") int userId) throws JsonProcessingException {
		
		System.out.println("request came for MANAGER WHOSE ID IS : "+userId);
		
		Optional<User> optionalUser = this.userDao.findById(userId);
		User user = new User();
		
		if(optionalUser.isPresent()) {
			user = optionalUser.get();
		}
		
		this.userDao.delete(user);
		
		return new ResponseEntity("SUCCESS", HttpStatus.OK);
		
	}
	
	@GetMapping("customer/all")
	public ResponseEntity<?> getAllUser() {
		System.out.println("recieved request for getting ALL USERS!!!");
		
		List<User> users = this.userDao.findByRole("Customer");
		
		System.out.println("response sent!!!");
		return ResponseEntity.ok(users);
	}
	
	@GetMapping("customer/remove")
	public ResponseEntity removeUser(@RequestParam("userId") int userId) throws JsonProcessingException {
		
		System.out.println("request came for remove USER WHOSE ID IS : "+userId);
		
		Optional<User> optionalUser = this.userDao.findById(userId);
		User user = new User();
		
		if(optionalUser.isPresent()) {
			user = optionalUser.get();
		}
		
		this.userDao.delete(user);
		
		return new ResponseEntity("SUCCESS", HttpStatus.OK);
		
	}
	
	@PostMapping("addWallet")
	public ResponseEntity<?> loginUser(@RequestBody AddWalletRequest addWalletRequest) {
		System.out.println("recieved request for adding wallet");
		System.out.println(addWalletRequest);
		
		User user = new User();
		user = userDao.findById(addWalletRequest.getUserId()).get();
		
		double amount = Double.parseDouble(addWalletRequest.getAmount());
		
		double walletAmount = user.getAmount();
		
		user.setAmount(walletAmount+amount);
		
		User user2 = userDao.save(user);
		
		if(user2 != null) {
			System.out.println(user);
			System.out.println("response sent!!!");
			return ResponseEntity.ok("Amount Added in Wallet");
		}
		
		else {
			System.out.println(user);
			System.out.println("response sent!!!");
			return ResponseEntity.ok("Failed to Add Amount in wallet");
		}
		
	}
	
	@GetMapping("getMyWallet")
	public ResponseEntity<?> getUserWallet(@RequestParam("userId") int userId) {
		System.out.println("recieved request for get user wallet !!!");
		
		User user = new User();
		user = userDao.findById(userId).get();
		
		AddWalletRequest addWalletRequest = new AddWalletRequest();
		addWalletRequest.setAmount(String.valueOf(user.getAmount()));
		
		System.out.println("response sent!!!");
		return ResponseEntity.ok(addWalletRequest);
	}
	
}
