library(shiny)
library(shinyjs)
library(shinythemes)
library(htmltools)
library(htmlwidgets)

# Define UI
ui <- fluidPage(
  useShinyjs(),
  theme = shinytheme("flatly"),
  tags$head(
    tags$link(rel = "stylesheet", type = "text/css", href = "https://cdn.datatables.net/1.10.25/css/jquery.dataTables.min.css"),
    tags$script(src = "https://cdn.datatables.net/1.10.25/js/jquery.dataTables.min.js")
  ),
  tags$style(type = "text/css", ".shiny-output-error { visibility: hidden; }"),
  fluidRow(
    column(12, h1("Throwing Assessment")),
    column(6, radioButtons("q1", "Does the trunk rotate to the side of the throw during the preparation action?",
                           choices = c("Yes", "No"))),
    column(6, textInput("assessor_name", "Assessor Name:")),
    column(6, conditionalPanel(condition = "input.q1 == 'Yes'", radioButtons("q2", "Is there a long contralateral step forward?",
                                                                             choices = c("Yes", "No")))),
    column(6, conditionalPanel(condition = "input.q1 == 'No'", radioButtons("q3", "Is there a step forward with either foot?",
                                                                            choices = c("Yes", "No")))),
    fluidRow(
      column(6, textInput("performer_name", "Performer Name:")),
      column(6, textInput("location_name", "Location:"))
    ),
    br(),
    actionButton("assess_button", "Assess"),
    br(),
    uiOutput("assess_result")
  )
)

# Define server
server <- function(input, output, session) {
  
  # Define assess function
  assess <- function(q1, q2, q3, performer_name, assessor_name, assessor_email) {
    result <- "No Result Yet"
    
    if (q1 == "Yes") {
      if (q2 == "Yes") {
        result <- "Level 4"
      } else {
        result <- "Level 3"
      }
    } else {
      if (q3 == "Yes") {
        result <- "Level 2"
      } else {
        result <- "Level 1"
      }
    }
    
    save_result(Sys.Date(), performer_name, "Default Location", result, assessor_name, assessor_email)
    return(result)
  }
  
  # Define save_result function
  save_result <- function(date, performer, location, result, assessor_name, assessor_email) {
    results <- data.frame(Performer = performer, Date = date, Location = location, Level = result)
    
    output_dir <- file.path(tempdir(), "assessment_results")
    dir.create(output_dir, recursive = TRUE, showWarnings = FALSE)
    
    # Save results to CSV file
    output_file <- file.path(output_dir, "assessment_results.csv")
    write.csv(results, file = output_file, row.names = FALSE)
    
    # Compress CSV file as ZIP
    zip_file <- file.path(output_dir, "assessment_results.zip")
    zip(zip_file, output_file)
    
    # Generate download link
    link <- paste0(
      "<a href='", zip_file, "' download='assessment_results.zip'>",
      "Download Assessment Results",
      "</a>"
    )
    
    # Display download link in Shiny app
    return(HTML(link))
     