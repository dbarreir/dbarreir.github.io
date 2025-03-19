const removeCourseButton = document.getElementById('remove-course');
const coursesContainer = document.getElementById('courses-container');
const introductionOutput = document.getElementById('introduction');
const form = document.getElementById('survey-form');
let courseLength = coursesContainer.querySelectorAll('#courses-container div').length;
removeCourseButton.style.display = 'none';

document.getElementById('add-course').addEventListener('click', () => {
    courseLength++;
    const div = document.createElement('div');
    div.id = 'course';
    div.innerHTML = `
        <label for="course-${courseLength}">Course name:</label>
        <input type="text" id="course-${courseLength}" name="courses[]">
        <label for="reason-${courseLength}">Reason:</label>
        <textarea name="reasons[]" id="reason-${courseLength}" cols="50" rows="5"></textarea>
    `;
    coursesContainer.appendChild(div);
    removeCourseButton.style.display = 'inline';
});

removeCourseButton.addEventListener('click', () => {
    if (courseLength > 1) {
        courseLength--;
        coursesContainer.removeChild(coursesContainer.children[courseLength]);
    }
    if (courseLength <= 1) {
        removeCourseButton.style.display = 'none';
    }
});

// Should also reset the default value?
document.getElementById('reset').addEventListener('click', () => {
    while (courseLength > 1) {
        courseLength--;
        coursesContainer.removeChild(coursesContainer.children[courseLength]);
    }
    removeCourseButton.style.display = 'none';
});

const hasValue = (element) => {
    if (!element.value) {
        introductionOutput.innerHTML += `<p style="color: red;">Please fill ${element.name.replace(/\-/g, ' ')}.</p>`;
    }
};

const getValues = () => {
    const image = document.getElementById('image').files[0];
    const dataNames = [
        'name', 'mascot', 'caption', 'personal-background', 'professional-background', 'academic-background',
        'web-dev-background', 'programming-background', 'primary-computer-platform'
    ];
    let formData = {};
    if (image === undefined) {
        introductionOutput.innerHTML += `<p style="color: red;">Please upload an image.</p>`;
    }
    dataNames.forEach((element) => {
        const data = document.getElementById(element);
        hasValue(data);
        formData[element.replace(/\-/g, '_')] = data.value;
    });
    if (introductionOutput.innerHTML) {
        return undefined;
    }
    // Finish filling out the data form and return it
    formData['something_funny'] = document.getElementById('something-funny').value;
    formData['anything_else'] = document.getElementById('anything-else').value;
    formData['image'] = URL.createObjectURL(image);
    let coursesData = ``;
    coursesContainer.querySelectorAll('#courses-container div').forEach((course, index) => {
        const courseName = course.children["course-" + (index + 1)].value;
        const courseReason = course.children["reason-" + (index + 1)].value;
        coursesData += `<li><b>${courseName}</b> - ${courseReason}</li>`;
    });
    formData['courses'] = `<ul>${coursesData}</ul>`;
    return formData;
};

document.getElementById('submit').addEventListener('click', (e) => {
    e.preventDefault();
    introductionOutput.innerHTML = '';
    let formData = getValues();
    if (formData === undefined) {
        return;
    }
    document.getElementsByTagName('h3')[0].style.display = 'none'; // Hide h3
    form.style.display = 'none'; // Hide form
    const formattedData = `
        <h3>${formData.name} | ${formData.mascot}</h3>
        <figure>
            <img src="${formData.image}" alt="Profile picture" class="center-image">
            <figcaption>${formData.caption}</figcaption>
        </figure>
        <div class="box-text">
            <ul>
                <li><b>Personal background:</b> ${formData.personal_background}</li>
                <li><b>Professional background:</b> ${formData.professional_background}</li>
                <li><b>Academic background:</b> ${formData.academic_background}</li>
                <li><b>Background in this subject:</b> ${formData.web_dev_background}</li>
                <li><b>Programming/Software Background:</b> ${formData.programming_background}</li>
                <li><b>Primary Computer Platform:</b> ${formData.primary_computer_platform}</li>
                <li>
                    <b>Courses I'm Taking &amp; Why:</b> ${formData.courses}
                </li>
                <li><b>Funny/Interesting item about yourself:</b> ${formData.something_funny ? formData.something_funny : 'pass'}</li>
                <li><b>I'd also like to share:</b> ${formData.anything_else ? formData.anything_else : 'pass'}</li>
            </ul>
        </div>
    `;
    introductionOutput.innerHTML = formattedData;
});