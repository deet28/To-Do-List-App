## Some Notes
  -- webpack uses
  1. bundling [css, js, html......]
  2. copying assets between folders
  3. serving static assets

  --questions for Ernest
  1. What is the best way to organize all of the variables I need? In other words,
     how can I keep the global namespace clear, and still have access to all
     of these variables across multiple files?
  2. I have a function (buttonListener) that stores event listeners which listen to other functions.
     I have to export the functions and the buttonListener function, but I only have to import and export
     the buttonListener function in my main file. Why does this work?