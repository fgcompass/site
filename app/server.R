library(shiny)

skill_questions <- list(
  throw = list(
    "Did the trunk rotate to the side of the throw during the preparation?",
    "Was there a step opposite the throwing arm?",
    "Did the child fail to step forward?"
  ),
  kick = list(
    "Did the child take a long stride/leap before ball contact?",
    "Did the placement foot move forward following ball contact?",
    "Did the child fail to step toward the ball?"
  )
)

shinyServer(function(input, output, session) {
  values <- reactiveValues(questionNumber = 0, result = NULL,
                           observerName = NULL, location = NULL, date = NULL, performer = NULL)
  
  observeEvent(input$submitInfo, {
    values$questionNumber <- 1
    values$observerName <- input$observer
    values$location <- input$location
    values$date <- input$date
    values$performer <- input$performer
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
      values$result <- "Level 4"
    } else {
      values$result <- "Level 3"
    }
    values$questionNumber <- 4
  })
  
  observeEvent(input$submitQ3, {
    if (input$q3 == "NO") {
      values$result <- "Level 2"
    } else {
      values$result <- "Level 1"
    }
    values$questionNumber <- 4
  })
  
  observeEvent(input$reset, {
    if (file.exists("results.csv")) {
      result_data <- read.csv("results.csv", stringsAsFactors = FALSE)
    } else {
      result_data <- data.frame(
        observer = character(),
        location = character(),
        skill = character(),
        date = character(),
        performer = character(),
        result = character(),
        stringsAsFactors = FALSE
      )
    }
    
    new_entry <- data.frame(
      observer = input$observer,
      location = input$location,
      skill = input$skill,
      date = as.character(input$date),
      performer = input$performer,
      result = values$result,
      stringsAsFactors = FALSE
    )
    
    result_data <- rbind(result_data, new_entry)
    write.csv(result_data, "results.csv", row.names = FALSE)
    
    values$questionNumber <- 0
    values$result <- NULL
  })
  
  
  output$question <- renderUI({
    if (values$questionNumber == 0) {
      tagList(
        selectInput("skill", "Select Skill", choices = c("throw", "kick")),
        textInput("observer", "Observer Name", value = values$observerName),
        textInput("location", "Location", value = values$location),
        textInput("performer", "Performer Name"),
        dateInput("date", "Date", value = values$date),
        actionButton("submitInfo", "Start Assessment")
      )
    } else if (values$questionNumber == 4) {
      tagList(
        h4("Skill Level:",
           values$result),
        actionButton("reset", "Assess Another Performer")
      )
    } else {
      skill <- input$skill
      question_text <- skill_questions[[skill]][values$
                                                  questionNumber]
      tagList(
        radioButtons(paste0("q", values$questionNumber), question_text, choices = c("YES", "NO"), inline = TRUE),
        actionButton(paste0("submitQ", values$questionNumber), "Submit")
      )
    }
  })
  
})

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
    windowTitle = "Skill Assessment"
  ),
  
  fluidRow(
    column(12,
           wellPanel(
             tags$h3(textOutput("questionTitle")),
             uiOutput("question"),
             textOutput("result")
           )
    )
  ),
  
  div(class = "footer",
      tags$p(HTML("&copy; Copyright 2023 "),
             tags$a("FG-COMPASS.", href = "https://fgcompass.com", target = "_blank"),
             "All rights reserved."),
      downloadButton("downloadResults", "Download Results")
  )
))
