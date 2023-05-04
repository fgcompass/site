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
      downloadLink("downloadResults", "Download Results")
  )
))
