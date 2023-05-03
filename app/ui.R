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
        tags$a(href = "https://fgcompass", target = "_blank",
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
      tags$p("Copyright 2023 FG-COMPASS. All rights reserved."),
      tags$p(tags$a("FG-COMPASS", href = "https://fgcompass.com", target = "_blank"))
  )
))
