library(shiny)

shinyServer(function(input, output, session) {
  questionNumber <- reactiveVal(0)
  result <- reactiveVal(NULL)
  assessmentData <- reactiveVal(data.frame(observer = character(),
                                           performer = character(),
                                           date = character(),
                                           location = character(),
                                           result = numeric(),
                                           stringsAsFactors = FALSE))
  
  observeEvent(input$submitInfo, {
    questionNumber(1)
  })
  
  observeEvent(input$submitQ1, {
    if (input$q1 == "YES") {
      questionNumber(2)
    } else {
      questionNumber(3)
    }
  })
  
  observeEvent(input$submitQ2, {
    if (input$q2 == "YES") {
      result(4)
      questionNumber(4)
    } else {
      result(3)
      questionNumber(4)
    }
  })
  
  observeEvent(input$submitQ3, {
    if (input$q3 == "YES") {
      result(2)
    } else {
      result(1)
    }
    questionNumber(4)
  })
  
  observeEvent(input$reset, {
    newRow <- data.frame(observer = input$observer,
                         performer = input$performer,
                         date = input$date,
                         location = input$location,
                         result = result(),
                         stringsAsFactors = FALSE)
    assessmentData(rbind(assessmentData(), newRow))
    questionNumber(0)
    result(NULL)
  })
  
  output$questionTitle <- renderText({
    if (questionNumber() == 0) {
      "Enter Information"
    } else if (questionNumber() <= 3) {
      paste("Question", questionNumber())
    } else {
      "Result"
    }
  })
  
  output$question <- renderUI({
    if (questionNumber() == 0) {
      tagList(
        textInput("observer", "Observer Name:"),
        textInput("performer", "Performer Name:"),
        dateInput("date", "Date:", value = Sys.Date(), format = "yyyy-mm-dd"),
        textInput("location", "Location:"),
        actionButton("submitInfo", "Begin Assessing"),
        downloadButton("downloadResults", "Download Results")
      )
    } else if (questionNumber() == 1) {
      tagList(
        radioButtons("q1", "Does the trunk rotate to the side of the throw during the preparation action?",
                     choices = c("YES", "NO"),
                     inline = TRUE),
        actionButton("submitQ1", "Submit")
      )
    } else if (questionNumber() == 2) {
      tagList(
        radioButtons("q2", "Is there a long contralateral step forward?",
                     choices = c("YES", "NO"),
                     inline = TRUE),
        actionButton("submitQ2", "Submit")
      )
    } else if (questionNumber() == 3) {
      tagList(
        radioButtons("q3", "Is there a step forward with either foot?",
                     choices = c("YES", "NO"),
                     inline = TRUE),
        actionButton("submitQ3", "Submit")
      )
    } else if (questionNumber() == 4) {
      actionButton("reset", "Assess Another Performer")
    }
  })
  
  output$result <- renderText({
    if (!is.null(result())) {
      paste("Observer:", input$observer,
            "\nPerformer:", input$performer,
            "\nDate:", input$date,
            "\nLocation:", input$location,
            "\n\nYour result is:", result())
    } else {
      ""
    }
  })
  
  output$downloadResults <- downloadHandler(
    filename = function() {
      paste("assessment_results_", Sys.Date(), ".csv", sep = "")
    },
    content = function(file) {
      write.csv(assessmentData(), file, row.names = FALSE)
    }
  )
})