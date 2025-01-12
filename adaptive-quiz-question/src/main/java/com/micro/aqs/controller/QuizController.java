package com.micro.aqs.controller;
import com.micro.aqs.entities.QuestionWrapper;
import com.micro.aqs.entities.Response;
import com.micro.aqs.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quiz")
public class QuizController {
    @Autowired
    private QuizService quizService;
    @PostMapping("/create")
    public ResponseEntity<String> createQuiz(@RequestParam String category,@RequestParam int numQ,@RequestParam String title){
        return  new ResponseEntity<>(quizService.createQuiz(category,numQ,title), HttpStatus.CREATED);

    }
    @GetMapping("/get/{id}")
    public  ResponseEntity<List<QuestionWrapper>> getQuizQuestions(@PathVariable int id){
        return new ResponseEntity<>(quizService.getQuizQuestions(id),HttpStatus.CREATED);

    }
    @PostMapping("submit/{id}")
    public ResponseEntity<Integer> submitQuiz(@PathVariable int id, @RequestBody List<Response> responses){
        return new ResponseEntity<>(quizService.calculateResult(id,responses),HttpStatus.OK);
    }
}
