meta_info:
  slug: scholarships-blacks-in-technology # <--- URL 4geeksacademy.com/us/landing/example

  visibility: "unlisted" # visible (default), hidden (not indexed) or unlisted (listed but not in sitemap).
  # This will show on social media when shared
  title: "Elevate your career with Blacks In Technology and 4Geeks Academy Scolarship!"
  description: "Thanks to Blacks In Technology we are giving away $30,000 in scolarships to celebrate black history month. Any african descent person can apply!"
  image: "/images/bg/remote.jpeg"
  keywords: "Learn to code, 4Geeks academy, scholarship"

  template: "landing_nonav" # <--- choose your landing template
  redirects: ["/bit"] # <--- URL redirections to avoid 404 errors

  # Set a particular course or location to the landing page
  # this UTM fields will be also included in the CRM contact
  utm_course: ["full-stack", "machine-learning-engineering"]
  utm_location: downtown-miami
  automation: strong #optional, this is the default value
  tag: website-lead #optional, this is the default value

navbar:
  buttonText: "Apply now"
  buttonUrl: "#bottom" # url accepts: relative(/apply), absolute(https://google.com), id(#componentName) or position(#top #bottom)
  logoUrl: "#"

form:
  # posible fields: "first_name", "last_name", "full_name", "phone", "email"
  # always the first_name, email and phone will be mandatory if added.
  fields: ["full_name", "phone", "email"]
  heading: "Apply now"
  button_label: Apply now
  redirect: "https://marketing892162.typeform.com/to/I8gW3RMs" #you can redirect to another url or entirely diffrent website

# jumbotron on the top (cannot be commented out)
header_data:
  tagline: $30k+ in scholarships
  sub_heading: ""
  partner_url: "https://foundation.blacksintechnology.net"
  image: "https://breathecode.herokuapp.com/v1/media/file/bit-foundation-logo-png"
  image_filter: brightness(0.4)

features:
  marginTop: 20px #<-- separation between tagline and the bullets

  #                                         up   left down  right
  styles: '{ "fontSize": "15px", "margin": "10px 0px 10px 0px" }'
  text: Landing Jobs is offering more than €1,000,000 in Scholarships to study Web Development or AI at 4Geeks Academy. The minimum scholarship is 30% and they will be awarded based on the results of the selection process. Whether you want to start your career as a Junior programmer or upskill  and become a Senior Developer, don't miss out on this amazing opportunity.
  bullets:
    - 300 scholarships in total, most of them greater than 50%
    - Ful-Stack Developer (Level 1) and AI/Machine Learning programs
    - Full-Time and Part-Time modality

follow_bar:
  position: "top" # top, bottom, hidden
  content:
    text: "Apply for a scholarship now. \n Financing options available."
    text_mobile: "Landing Jobs scholarships . \n Payment plans available"
    # devices:   XL      LG    MD      SM    XS
    font_size: ["25px", "25px", "25px", "18px", "4.3vw"]
  button:
    text: "Apply for a scholarship"
    path: "#top" #top, #bottom, #anotherComponentId
    # ├──if path is empty("") it point to top per default ("#" -> points to top)
    # └── path accepts: relative(/example/path), absolute(https://google.com) or id(#idName)
  phone:
    text: "WhatsApp "

#
# ⬇ FROM HERE ON YOU CAN COMMENT ANYTHING TO HIDE IT ON THE LANDING ⬇
#
badges:
  position: 1 # It's the position of the component that will be rendered first
  heading: "4Geeks Academy has awards and recognitions that validate it's excellence"

about4Geeks:
  position: 2
  heading: Flexible and intensive education
  sub_heading: "More than 400 hours of practical learning (exercises, projects). You will be able to improve your skills in order to face interviews and different selection processes that will allow you to find a job as a Junior or Senior Developer."
  list:
    - title: "Lifetime Career Support"
    - title: "Financial options to complement your scholarship"
    - title: "Ratio 1:5 teacher student. Unlimited 1 on 1 mentoring"
    - title: "Preparation for interviews and selection processes"
  paragraph: ""
  button_text: "Apply for a scholarship"
  button_link: "#" # accepts url: relative(/us/apply), absolute(https://google.com) or component id(#componentName)
  image: "../../../static/images/bg/community.png"
  image_mobile: "../../../static/images/bg/community.png"

iconogram:
  position: 3
  icons:
  - icon: "touch"
    title: Apply for your scholarship before October 8th, 2021
  - icon: "receive_mail"
    title: You will receive an email with all the information and a logic test 
  - icon: "talk"
    title: Do an online interview with our admissions team 
  - icon: "terminal"
    title: Get the result, book your spot and start coding

who_is_hiring:
  position: 4
  heading: "OUR STUDENTS WORK AT"
  sub_heading: "Get a job in less than 3 months thanks to our growing network of more than 500 technology companies. Access to national and international offers and a community of more than 2000 graduates"
  featured:
    - name: "Facebook"
      image: "../../../static/images/partner/facebook.png"
    - name: "Microsoft"
      image: "../../../static/images/partner/microsoft.png"
    - name: "Apple"
      image: "../../../static/images/partner/apple.png"

choose_your_program:
  position: 5
  title: Our Programs
  paragraph: Programs in Full-Time or Part-Time modality with live classes taught by experts
  programs:
  - title: "Full Stack Developer"
    sub_title: "Level 1"
    icon: "fullstack"
    description: |
      From 0 to becoming a Full-Stack Jr. programmer, you will work with HTML5, CSS3, Bootstrap, JS, Reactjs, SQL, Python, Flask, REST API's, etc. to design and create responsive websites. You'll gain a solid foundation of front, back, database, distributed processes, and deployment with passionate instructors and an up-to-date, hands-on syllabus.
      Available Part-Time or Full-Time mode. Download <a href=https://storage.googleapis.com/4geeks-academy-website/syllabus/europe/Syllabus%20Europe%20EN.pdf target=_blank>"here the syllabus"</a>.  
    
    text_link: Apply for a scholarship
    link: "#" # moves to start position
    
  - title: "AI & Machine Learning"
    sub_title: "Developers and STEM Profiles"
    icon: "machine"
    description: |
      Get trained by a renowned expert in A.I.; explore Machine Learning's fundamentals and Deep Learning with some of the most powerful technologies that truly scale intelligence for business. Practice with real-life business scenarios typical in business and review some of the tools used in the industry. Strategize and develop your A.I. following the lifecycle development from start to end, including deployment into production and maintenance with Privacy, Security, and Ethics. 
      Download <a href=https://storage.googleapis.com/4geeks-academy-website/syllabus/europe/Syllabus%20Europe%20EN.pdf target=_blank>"here the syllabus"</a>. 
      
    text_link: Apply for a scholarship
    link: "#"


why_4geeks:
  position: 7
  heading: "In words of our students"
  sub_heading: ""
  footer:
    text: "Financing options"
    text_link: "https://storage.googleapis.com/4geeks-academy-website/syllabus/europe/Payment%20Guide%20Landing%20Jobs%20Scholarships%20(2).pdf"

apply_schollarship: # form that is displayed at the end of the landing
  # title: "Apoyo Profesional Ilimitado"
  imageSide: "right"
  image: "../../../static/images/comunity-support.png"

# Possible layours: [two_column_left_image, two_column_right_image]
components:
  - name: python_y_javascript
    position: 6
    layout: two_column_right
    background: "veryLightBlue2" # Name of the color(from components/Styling/index.js) or color code ex: #C9F9F9
    image:
      src: "/images/why-4geeks/python-image.png"
      # /static/images/why-4geeks/python-image.png
    # video: "B01-eTfgqqc"
    heading:
      text:
        "Python and Javascript"
        #           xl      lg      md      sm      xs
      font_size: ["50px", "50px", "50px", "50px", "50px"]
    content:
      text: "Our programs are based on the use of Python and Javascript. The reason? In the job market JavaScript has 26 times more job openings than Ruby on Rails. Python has 10 times more jobs than node.js.
      Other tools that you will also learn to use in our programs are: GitHub, Git, Redux, Amazon Web Services, etc."
      font_size: ["16px"]