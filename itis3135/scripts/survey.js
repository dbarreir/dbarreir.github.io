const removeCourseButton = document.getElementById('remove-course');
const coursesContainer = document.getElementById('courses-container');
const introductionOutput = document.getElementById('introduction');
const form = document.getElementById('survey-form');
const resetIntroduction = document.getElementById('reset-form');
let courseLength = coursesContainer.querySelectorAll('#courses-container div').length;
removeCourseButton.style.display = 'none';
resetIntroduction.style.display = 'none';

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

document.getElementById('reset').addEventListener('click', () => {
    while (courseLength > 1) {
        courseLength--;
        coursesContainer.removeChild(coursesContainer.children[courseLength]);
    }
    removeCourseButton.style.display = 'none';
});

resetIntroduction.addEventListener('click', () => {
    form.style.display = 'block';
    introductionOutput.innerHTML = '';
    resetIntroduction.style.display = 'none';
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
    dataNames.forEach((element) => {
        const data = document.getElementById(element);
        hasValue(data);
        formData[element.replace(/\-/g, '_')] = data.value;
    });
    if (!document.getElementById('agreement').checked) {
        introductionOutput.innerHTML += `<p style="color: red;">Please check agreement.</p>`;
    }
    if (introductionOutput.innerHTML) {
        return undefined;
    }
    // Finish filling out the data form and return it to display information
    formData['something_funny'] = document.getElementById('something-funny').value;
    formData['anything_else'] = document.getElementById('anything-else').value;
    formData['image'] = image === undefined ? document.getElementById('default-image').src : URL.createObjectURL(image);
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
    document.getElementsByTagName('h3')[0].style.display = 'none'; // Hide h3 title
    form.style.display = 'none'; // Hide form
    resetIntroduction.style.display = 'block';
    const formattedData = `
        <h3>${formData.name} | ${formData.mascot}</h3>
        <figure>
            <img src="${formData.image}" alt="Profile picture" class="center-image">
            <figcaption>${formData.caption}</figcaption>
        </figure>
        <div class="box-text">
            <ul>
                <li><strong>Personal background:</strong> ${formData.personal_background}</li>
                <li><strong>Professional background:</strong> ${formData.professional_background}</li>
                <li><strong>Academic background:</strong> ${formData.academic_background}</li>
                <li><strong>Background in this subject:</strong> ${formData.web_dev_background}</li>
                <li><strong>Programming/Software Background:</strong> ${formData.programming_background}</li>
                <li><strong>Primary Computer Platform:</strong> ${formData.primary_computer_platform}</li>
                <li>
                    <strong>Courses I'm Taking &amp; Why:</strong> ${formData.courses}
                </li>
                <li><strong>Funny/Interesting item about yourself:</strong> ${formData.something_funny ? formData.something_funny : 'pass'}</li>
                <li><strong>I'd also like to share:</strong> ${formData.anything_else ? formData.anything_else : 'pass'}</li>
            </ul>
        </div>
    `;
    introductionOutput.innerHTML = formattedData;
});