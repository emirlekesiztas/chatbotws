package com.emir.chatbot.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageDto implements Serializable {
    private String message;
    private String username;
    private Date sent_At;
}
