library(shiny)

shinyUI(fluidPage(
  titlePanel("Throwing Proficiency Assessment"),
  fluidRow(
    column(6,
           wellPanel(
             tags$h3(textOutput("questionTitle")),
             uiOutput("question"),
             textOutput("result")
           )
    ),
    column(6,
           img(src = "throw.png", height = "auto", width = "100%")
    )
  )
))
