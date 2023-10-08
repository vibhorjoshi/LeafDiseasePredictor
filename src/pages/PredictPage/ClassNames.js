const class_names = [
    'Apple___Apple_scab',
    'Apple___Black_rot',
    'Apple___Cedar_apple_rust',
    'Apple___healthy',
    'Cherry___Powdery_mildew',
    'Cherry___healthy',
    'Corn___Cercospora_leaf_spot Gray_leaf_spot',
    'Corn___Common_rust',
    'Corn___Northern_Leaf_Blight',
    'Corn___healthy',
    'Grape___Black_rot',
    'Grape___Esca_(Black_Measles)',
    'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)',
    'Grape___healthy',
    'Peach___Bacterial_spot',
    'Peach___healthy',
    'Pepper,_bell___Bacterial_spot',
    'Pepper,_bell___healthy',
    'Potato___Early_blight',
    'Potato___Late_blight',
    'Potato___healthy',
    'Orange___Haunglongbing_(Citrus_greening)',
    'Strawberry___Leaf_scorch',
    'Strawberry___healthy',
    'Tomato___Bacterial_spot',
    'Tomato___Early_blight',
    'Tomato___Late_blight',
    'Tomato___Leaf_Mold',
    'Tomato___Septoria_leaf_spot',
    'Tomato___Spider_mites Two-spotted_spider_mite',
    'Tomato___Target_Spot',
    'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
    'Tomato___Tomato_mosaic_virus',
    'Tomato___healthy'
]
const class_mappings = [
    {
        name: "Apple",
        startingIndex: 0,
        endingIndex: 3
    },
    {
        name: "Cherry",
        startingIndex: 4,
        endingIndex: 5
    },
    {
        name: "Corn",
        startingIndex: 6,
        endingIndex: 9
    },
    {
        name: "Grape",
        startingIndex: 10,
        endingIndex: 13
    },
    {
        name: "Peach",
        startingIndex: 14,
        endingIndex: 15
    },
    {
        name: "Pepper",
        startingIndex: 16,
        endingIndex: 17
    },
    {
        name: "Potato",
        startingIndex: 18,
        endingIndex: 20
    },
    {
        name: "Orange",
        startingIndex: 21,
        endingIndex: 21
    },
    {
        name: "Strawberry",
        startingIndex: 22,
        endingIndex: 23
    },
    {
        name: "Tomato",
        startingIndex: 24,
        endingIndex: 33
    }


]

export { class_names, class_mappings }