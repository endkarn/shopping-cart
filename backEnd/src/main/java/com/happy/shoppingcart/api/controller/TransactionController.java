package com.happy.shoppingcart.api.controller;


import com.happy.shoppingcart.api.controller.domain.TransactionResponse;
import com.happy.shoppingcart.api.service.domain.VisaDetail;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping(path = "/api/v1/transaction")
public class TransactionController {

    //@PutMapping
    //public ResponseEntity<TransactionResponse> getVisaDetail(@RequestHeader(name = "X-Correlation-Id", required = true) String correlationId,
     //                                                 @RequestBody VisaDetail request )throws Exception {
        //TransactionResponse response = new TransactionResponse;
        //ResponseEntity<TransactionResponse> responseEntity = ResponseEntity.status(HttpStatus.OK).body(response);
        //return responseEntity;
    //}

}
