library(shiny)

shinyUI(fluidPage(
  tags$head(tags$style(HTML("
    .navbar {
      background-color: #YOUR_BRAND_COLOR;
      font-family: 'YOUR_FONT_NAME', sans-serif;
    }
    .navbar-brand {
      padding: 5px;
    }
    .logo-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .footer {
      position: fixed;
      bottom: 0;
      width: 100%;
      background-color: #f8f9fa;
      padding: 10px 0;
      text-align: center;
    }
  "))),
  
  titlePanel(
    div(class = "logo-container",
        tags$a(href = "https://fgcompass.com", target = "_blank",
               tags$img(src = "brand_logo.png", height = "auto", width = "100px")
        )
    ),
    windowTitle = "Throwing Proficiency Assessment"
  ),
  
  fluidRow(
    column(6,
           wellPanel(
             tags$h3(textOutput("questionTitle")),
             uiOutput("question"),
             textOutput("result")
           )
    ),
    column(6,
           img(src = "dt-throw.png", height = "auto", width = "100%", alt = "Your Image")
    )
  ),
  
  div(class = "footer",
      tags$p(HTML("&copy; Copyright 2023 "),
             tags$a("FG-COMPASS.", href = "https://fgcompass.com", target = "_blank"),
             "All rights reserved.")  )
))




# server

library(shiny)

shinyServer(function(input, output, session) {
  
  # Add this code to increase session timeout
  session$onSessionEnded(function() {
    session$allowReconnect(TRUE) # Set reconnect to true
    Sys.sleep(3600) # Set the timeout to 1 hour
  })
  
  values <- reactiveValues(questionNumber = 0, result = NULL,
                           observerName = NULL, location = NULL)
  
  observeEvent(input$submitInfo, {
    values$questionNumber <- 1
    values$observerName <- input$observer
    values$location <- input$location
  })
  
  observeEvent(input$submitQ1, {
    if (input$q1 == "YES") {
      values$questionNumber <- 2
    } else {
      values$questionNumber <- 3
    }
  })
  
  observeEvent(input$submitQ2, {
    if (input$q2 == "YES") {
      values$result <- 4
      values$questionNumber <- 4
    } else {
      values$result <- 3
      values$questionNumber <- 4
    }
  })
  
  observeEvent(input$submitQ3, {
    if (input$q3 == "YES") {
      values$result <- 2
    } else {
      values$result <- 1
    }
    values$questionNumber <- 4
  })
  
  observeEvent(input$reset, {
    newRow <- data.frame(observer = input$observer,
                         performer = input$performer,
                         date = input$date,
                         location = input$location,
                         skill = "throw",
                         result = values$result,
                         stringsAsFactors = FALSE)
    assessmentData(rbind(assessmentData(), newRow))
    values$questionNumber <- 0
    values$result <- NULL
  })
  
  output$questionTitle <- renderText({
    if (values$questionNumber == 0) {
      "Enter Information"
    } else if (values$questionNumber <= 3) {
      paste("Question", values$questionNumber)
    } else {
      "Result"
    }
  })
  
  output$question <- renderUI({
    if (values$questionNumber == 0) {
      tagList(
        textInput("observer", "Observer Name:", value = values$observerName),
        textInput("performer", "Performer Name:"),
        textInput("location", "Location:", value = values$location),
        dateInput("date", "Date:", value = Sys.Date(), format = "yyyy-mm-dd"),
        selectInput("skill", "Select Skill:", choices = c("throw", "skill2", "skill3", "skill4", "skill5", "skill6", "skill7", "skill8", "skill9", "skill10")),
        actionButton("submitInfo", "Begin Assessing"),
        downloadButton("downloadResults", "Download Results")
      )
    } else if (values$questionNumber == 1) {
      tagList(
        radioButtons("q1", "Does the trunk rotate to the side of the throw during the preparation action?",
                     choices = c("YES", "NO"),
                     inline = TRUE),
        actionButton("submitQ1", "Submit")
      )
    } else if (values$questionNumber == 2) {
      tagList(
        radioButtons("q2", "Is there a long contralateral step forward?",
                     choices = c("YES", "NO"),
                     inline = TRUE),
        actionButton("submitQ2", "Submit")
      )
    } else if (values$questionNumber == 3) {
      tagList(
        radioButtons("q3", "Is there a step forward with either foot?",
                     choices = c("YES", "NO"),
                     inline = TRUE),
        actionButton("submitQ3", "Submit")
      )
    } else if (values$questionNumber == 4) {
      actionButton("reset", "Assess Another Performer")
    }
  })
  
  output$result <- renderText({
    if (!is.null(values$result)) {
      paste("Observer:", input$observer,
            
            "\nPerformer:", input$performer,
            "\nDate:", input$date,
            "\nLocation:", input$location,
            "\n\nYour result is:", values$result)
    } else {
      ""
    }
  })
  
  assessmentData <- reactiveVal(data.frame(observer = character(0),
                                           performer = character(0),
                                           date = as.Date(character(0)),
                                           location = character(0),
                                           result = integer(0),
                                           stringsAsFactors = FALSE))
  
  output$downloadResults <- downloadHandler(
    filename = function() {
      paste("assessment_results_", Sys.Date(), ".csv", sep = "")
    },
    content = function(file) {
      write.csv(assessmentData(), file, row.names = FALSE)
    }
  )
})