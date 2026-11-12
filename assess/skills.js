/* FG-COMPASS decision trees and testing protocols (v2.2), used by the web app.
   Source: static/files/fgcompass-decision-trees-v2.2.pdf and
           static/files/fgcompass-testing-protocols-port-v2.2.pdf
   Every tree has the same shape:
     q1 (discriminatory)  YES -> up (upper confirmatory): YES = Level 4, NO = Level 3
                          NO  -> low (lower confirmatory): YES = Level 1, NO = Level 2
   PT-BR: skill names are translated; questions and protocols stay in English until the
   official Portuguese version of the assessment is added (fill in the `pt` fields then).
   Level illustrations: img/<id>-l<level>.jpg (from the protocols PDF). `noImg` lists levels
   whose illustration is not available yet. */
window.FG_SKILLS = [
  // ---------------- Object control (manipulative) ----------------
  {
    id: "throw", group: "obj", name: { en: "Overhand throw", pt: "Arremesso por cima do ombro" },
    q1: "Did the trunk rotate to the side of the throw during preparation?",
    up: "Was there a long step opposite the throwing arm?",
    low: "Did the child fail to step forward?",
    levels: [
      "The trunk faces the target, and there is no step forward. Jumping up and down is not considered a step forward.",
      "Minimal or no trunk rotation during the preparatory phase. However, a forward step is taken, using either foot.",
      "The throw involves rotating the trunk to the side and taking a small contralateral step forward.",
      "The trunk rotates to the side with a long contralateral step forward (at least half the performer's height)."
    ],
    setup: [
      "Tape a line on the floor 20 feet from the wall.",
      "Stand about 10 feet from the child to get a side view of the action.",
      "Place a bucket with several beanbags 3 feet before the line."
    ],
    say: [
      "I want to see your throw.",
      "Walk up to the bucket, grab one beanbag, and throw it as hard as you can against the wall without stepping over the line.",
      "Then do it three more times.",
      "Watch as I demonstrate."
    ],
    notes: [
      "Give four trials (the first is for practice only).",
      "Do not allow the child to step over the line."
    ]
  },
  {
    id: "kick", group: "obj", name: { en: "Kick", pt: "Chute" },
    q1: "Did the child take a long stride/leap before ball contact?",
    up: "Did the placement foot move forward following ball contact?",
    low: "Did the child fail to step toward the ball?",
    levels: [
      "The child stands behind the ball and kicks it without taking a step forward.",
      "There is at least one step before kicking the ball, without a long stride or leap. It often looks as though the child runs directly through the ball.",
      "A few steps toward the ball with a lengthened stride or jump right before kicking, but no follow-through after the kick.",
      "A long stride or leap before contacting the ball. After contact, the placement foot keeps moving forward."
    ],
    setup: [
      "Tape a kicking line on the floor 20 feet from the wall.",
      "Stand about 10 feet from the child for a side view of the action.",
      "Place a bucket with several soccer balls 3 feet before the kicking line."
    ],
    say: [
      "I want to see your kick.",
      "Walk up to the bucket, grab a soccer ball, place it on the kicking line, and kick it against the wall.",
      "Then repeat it three more times.",
      "Watch as I demonstrate."
    ],
    notes: [
      "Give four trials (the first is for practice only).",
      "Running toward the ball, stopping completely and then kicking counts as taking no steps toward the ball.",
      "Swinging the body back and then forward before the kick is not a complete step."
    ]
  },
  {
    id: "dribble", group: "obj", name: { en: "Stationary dribble", pt: "Quicar a bola parado" },
    q1: "Did the ball bounce in front/outside of the preferred foot?",
    up: "Was the child able to keep control without using vision?",
    low: "Did the child ever lose total control of the ball?",
    levels: [
      "The child struggles to control the ball as it bounces erratically, and loses control at least once.",
      "Despite a lack of control, the child bounces the ball continuously for 15 seconds.",
      "Vision is used to keep control. Bounces land in front of or outside the preferred foot, with more control of the ball.",
      "Control is clear, and the child does not rely on vision to keep control of the ball."
    ],
    setup: [
      "Tape a 4' x 4' square on the floor to mark personal space.",
      "Stand about 6 feet from the child.",
      "Have a stopwatch and a small or medium basketball ready."
    ],
    say: [
      "I want to see you dribble a basketball with one hand.",
      "Try to stay inside the square while dribbling.",
      "If the ball goes out, pick it up, come back inside the square and start again.",
      "I will tell you when to stop.",
      "Watch as I demonstrate."
    ],
    notes: [
      "Give a practice trial of about 5 seconds.",
      "Time 15 seconds of dribbling. Stop the clock if the ball goes out and restart it when the child resumes.",
      "Children who keep control with only brief glances show vision-independent control. If they lose control when not looking, they are Level 3."
    ]
  },
  {
    id: "catch", group: "obj", name: { en: "Catch", pt: "Receber" },
    q1: "Was the ball caught using only hands without touching any other body part?",
    up: "Did the hands move well-timed and synchronized while catching the ball?",
    low: "Did the child trap the ball against the chest?",
    levels: [
      "The child uses a scooping action to secure the ball against the chest.",
      "The ball is not trapped against the chest, but touches a body part other than the hands after a successful catch.",
      "The action lacks coordination, with the ball contacting only the hands. Children often extend their arms and/or turn their face to the side.",
      "The action is well timed, with the hands moving together."
    ],
    setup: [
      "Tape a 4' x 4' square on the floor to mark personal space.",
      "Stand about 6 feet from the child."
    ],
    say: [
      "I want to see you catch a ball with two hands.",
      "Stand anywhere inside the square.",
      "Watch as I demonstrate."
    ],
    notes: [
      "Give four trials (the first is for practice only).",
      "Use an underhand toss at the child's chest level.",
      "Repeat any bad toss (too high, too low or to the side) and judge only the three valid tosses.",
      "A ball caught with the hands and then brought to the chest indicates Level 2."
    ]
  },
  {
    id: "strike", group: "obj", name: { en: "Strike (batting)", pt: "Rebater" },
    q1: "Did the swing follow a full arc in a horizontal plane?",
    up: "Did the body weight shift from one leg to the other during movement?",
    low: "Was the bat's motion on a downward plane from back to front?",
    levels: [
      "The arm action goes from back to front and looks like a vertical chopping motion.",
      "The motion is on the horizontal plane but limited in amplitude. The bat is often held in front of the body.",
      "The strike follows a long, full horizontal arc, but there is no body weight transfer.",
      "Same as Level 3, plus a transfer of weight from one leg to the other in the direction of the strike."
    ],
    setup: [
      "Tape a 4' x 4' square on the floor, 20 feet from the wall.",
      "Stand slightly to the side (about 12 feet away), facing the child.",
      "For a left-handed child, invert the position (child faces the opposite wall or open space)."
    ],
    say: [
      "I want to see you strike a ball tossed in your direction.",
      "Try to stay inside the square, but you can move as the ball approaches.",
      "Strike the ball toward the wall or open space.",
      "Watch as I demonstrate."
    ],
    notes: [
      "Give four trials (the first is for practice only).",
      "Use an underhand toss, just above the child's hip level.",
      "Repeat any bad toss and judge only the three valid tosses."
    ]
  },
  // ---------------- Locomotor ----------------
  {
    id: "hop", group: "loc", name: { en: "Hop", pt: "Saltar em um pé" },
    q1: "Was the hanging leg's knee bent 90 degrees or less, with a vertical thigh?",
    up: "Did the hanging leg's foot swing across the support leg's line like a pendulum?",
    low: "Was the hanging leg held in front of the body?",
    levels: [
      "The hanging leg is held in front of the body.",
      "The knee is bent, with the foot of the hanging leg held near the buttocks.",
      "The hanging leg is held back, with the thigh vertical.",
      "Like Level 3, but the foot of the hanging leg swings across the line of the support leg like a pendulum."
    ],
    setup: [
      "Create a 15-foot travel lane with cones.",
      "Tape starting and ending lines on the floor, with a cone 1 foot before each line.",
      "Stand perpendicular to the lane so you can see both ends."
    ],
    say: [
      "I want to see you hop on one leg. Choose the leg you like best.",
      "Start at the starting line and don't stop until you pass the ending line, then come back on the same leg.",
      "This is not a race; show your best form.",
      "Watch as I demonstrate."
    ],
    notes: ["Give four trials (the first is for practice only)."]
  },
  {
    id: "hjump", group: "loc", noImg: [1], name: { en: "Horizontal jump", pt: "Salto horizontal" },
    q1: "Did the arms move forward & upward upon takeoff and downward at landing?",
    up: "Did the hands exceed the height of the head at liftoff?",
    low: "Was the takeoff/landing executed on one foot?",
    levels: [
      "The arm action is inconsistent with no defined pattern, sometimes motionless. Takeoff and/or landing is on one foot.",
      "The arm action may still be inconsistent, but takeoff and landing are on both feet.",
      "The arms move forward and upward at takeoff and downward at landing, but the hands do not go above the head at liftoff.",
      "Like Level 3, but the hands rise above the head at liftoff."
    ],
    setup: [
      "Tape two parallel lines on the floor, 2 feet apart.",
      "Stand perpendicular to the jump, facing the side of the child."
    ],
    say: [
      "I want to see you jump forward over the second line using both feet.",
      "Walk up to the first line and stop completely. Then jump as far as you can over the second line.",
      "Use both feet to take off and land. Then walk back and do it again.",
      "There is no rush; show your best jump. Watch as I demonstrate."
    ],
    notes: [
      "Give four trials (the first is for practice only).",
      "The child must stop completely behind the line before jumping."
    ]
  },
  {
    id: "skip", group: "loc", noImg: [3], name: { en: "Skip", pt: "Saltitar" },
    q1: "Did the arms move rhythmically in opposition to the legs?",
    up: "Was there a low vertical lift on hop?",
    low: "Is there a break in the rhythm caused by a double hop or step?",
    levels: [
      "The arm action is inconsistent with no defined pattern. The rhythm is broken by a double hop or step.",
      "The arm action may improve but is still inconsistent and often motionless. The feet are well coordinated, without a double hop or step.",
      "The arms move rhythmically in opposition to the legs, but there is an exaggerated vertical lift on the hop.",
      "The arms move rhythmically in opposition to the legs, and the vertical lift on the hop is low."
    ],
    setup: [
      "Create a 15-foot travel lane with cones.",
      "Tape starting and ending lines on the floor, with a cone 1 foot before each line.",
      "Stand perpendicular to the lane so you can see both ends."
    ],
    say: [
      "I want to see you skipping.",
      "Start at the starting line and don't stop until you pass the ending line.",
      "This is not a race; show your best form.",
      "Watch as I demonstrate."
    ],
    notes: ["Give four trials (the first is for practice only)."]
  },
  {
    id: "vjump", group: "loc", name: { en: "Vertical jump", pt: "Salto vertical" },
    q1: "Did the arms move backward during preparation?",
    up: "Did one arm reach upward at the flight's peak while the other swung downward?",
    low: "Was the takeoff/landing executed on one foot?",
    levels: [
      "The arms don't move back before takeoff; the child takes off and/or lands on one foot.",
      "The arms don't move back before takeoff; takeoff and landing are on both feet.",
      "The arms move back before takeoff, but only the reaching arm reaches up.",
      "The arms move back before takeoff; the reaching arm goes up while the other arm moves down at the peak of the flight."
    ],
    setup: [
      "Tape four parallel lines on the wall, 2 feet apart.",
      "Stand perpendicular to the jump, facing the side of the child.",
      "Ask the child to stand sideways with the dominant arm facing the wall."
    ],
    say: [
      "I want to see you jump high.",
      "Walk up to the wall and stand sideways. When I say so, jump and touch the highest point you can with your writing hand.",
      "Use both feet to take off and land, then go back to the start.",
      "There is no rush; show your best jump. Watch as I demonstrate."
    ],
    notes: [
      "Give four trials (the first is for practice only).",
      "Ask which hand the child writes with to find the dominant hand."
    ]
  },
  {
    id: "gallop", group: "loc", name: { en: "Gallop", pt: "Galope" },
    q1: "Was the action smooth (not choppy) and performed at a moderate speed?",
    up: "Did the arms move in unison, upward during takeoff and downward during landing?",
    low: "Did the trailing foot land in front of the leading foot?",
    levels: [
      "The action is choppy or stiff, often at a fast tempo; the trailing foot lands in front of the leading foot.",
      "Still not smooth, and the trailing foot may cross the leading foot in the air, but it does not land in front of it.",
      "The action is smooth, rhythmical and at a moderate tempo, but the arm action has no defined pattern.",
      "Smooth, rhythmical and at a moderate speed; the elbows lift to waist level at takeoff and move down at landing."
    ],
    setup: [
      "Create a 15-foot travel lane with cones.",
      "Tape starting and ending lines on the floor, with a cone 1 foot before each line.",
      "Stand perpendicular to the lane so you can see both ends."
    ],
    say: [
      "I want to see you galloping.",
      "Start at the starting line and don't stop until you pass the ending line.",
      "This is not a race; show your best form.",
      "Watch as I demonstrate."
    ],
    notes: ["Give four trials (the first is for practice only)."]
  }
];
