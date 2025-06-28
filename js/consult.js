// 隐私政策模态框
// 对象：隐私政策模态框 
// css .modal
// css .modal-content-consult
// css .close
function openModal() {
    document.getElementById("privacyModal").style.display = "block";
}

function closeModal() {
    document.getElementById("privacyModal").style.display = "none";
}

window.onclick = function (event) {
    const modal = document.getElementById("privacyModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};
// 关闭模态框时，清空错误信息


// 清空内容和计数器
function clearForm() {
    document.querySelectorAll(".counter").forEach(counter => {
        if (counter.id === "questionCounter") {
            counter.textContent = "0 / 1000";
        } else if (counter.id === "nameCounter") {
            counter.textContent = "0 / 20";
        } else if (counter.id === "telCounter") {
            counter.textContent = "0 / 11";
        } else if (counter.id === "emailCounter") {
            counter.textContent = "0 / 30";
        } else if (counter.id === "titleCounter") {
            counter.textContent = "0 / 20";
        } else if (counter.id === "fileSize") {
            counter.textContent = "";
        } else { }
        
    });
    
    // document.getElementById("fileSize").textContent = "";
    
    document.querySelectorAll(".error-message").forEach(error => {
        error.textContent = "";
        error.style.display = "none";
    });
    
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.value = "";
        input.style = "border: none";
    });
    // // 初始化inquiryType样式
    document.getElementById('inquiryType').style="font-style: italic; color: #888;font-size: 0.8em;";
}

function showboder(e) {
    e.style = "border: 2px solid rgba(238, 238, 60, 0.85);";

}

// 姓名计数器
function updateNameCounter() {
    const name = document.getElementById("name");
    const counter = document.getElementById("nameCounter");
    counter.textContent = name.value.length + " / 20";

    // 每次输入都隐藏错误提示
    document.getElementById("nameError").style.display = "none";
}

// 姓名校验
function validateName() {
    const name = document.getElementById("name");
    const error = document.getElementById("nameError");
    const val = name.value.trim();

    if (val.length < 2 || val.length > 20) {
        error.textContent = "※エラー：2桁以上20桁以内で入力してください";
        error.style.display = "block";
        // name.focus();
        // name.select();
        name.scrollIntoView({ behavior: "smooth", block: "center" });
        // 滚动到姓名输入框
        name.style = "border: 1px solid red"; // 添加红色背景以突出显示错误

        return false;
    } else {
        error.textContent = "";
        error.style.display = "none";
        name.style = "border: none;background-color:rgb(232, 240, 254);"; 
        return true;
    }
}

// 电话号码计数器
function updateTelCounter() {
    const tel = document.getElementById("tel");
    const counter = document.getElementById("telCounter");
    counter.textContent = tel.value.length + " / 11";

    // 每次输入都隐藏错误提示
    document.getElementById("telError").style.display = "none";
}

// 电话号码校验
function validateTel() {
    const tel = document.getElementById("tel");
    const error = document.getElementById("telError");
    const val = tel.value.trim();

    const pattern = /^(\d{10,11}|\d{3}-\d{4}-\d{4})$/;

    if (val !== "" && !pattern.test(val)) {
        error.textContent = "※エラー：有効な電話番号入力してください。";
        error.style.display = "block";
        tel.scrollIntoView({ behavior: "smooth", block: "center" });
        // 滚动到姓名输入框
        tel.style = "border: 1px solid red";; // 添加红色背景以突出显示错误
        return false;
    } else {
        error.textContent = "";
        error.style.display = "none";
        tel.style = "border: none;background-color:rgb(232, 240, 254);"; 
        return true;
    }
}

// 邮箱计数器
function updateEmailCounter() {
    const email = document.getElementById("email");
    const counter = document.getElementById("emailCounter");
    counter.textContent = email.value.length + " / 30";

    // 每次输入都隐藏错误提示
    document.getElementById("emailError").style.display = "none";
}

// 邮箱校验
function validateEmail() {
    const email = document.getElementById("email");
    const error = document.getElementById("emailError");
    const val = email.value.trim();

    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!pattern.test(val)) {
        error.textContent = "※エラー：有効なメールアドレスを入力してください";
        error.style.display = "block";
        email.scrollIntoView({ behavior: "smooth", block: "center" });
        // 滚动到姓名输入框
        email.style = "border: 1px solid red"; // 添加红色背景以突出显示错误

        return false;
    } else {
        error.textContent = "";
        error.style.display = "none";
        email.style = "border: none;background-color:rgb(232, 240, 254);"; 
        return true;
    }
}

// title计数器
function updateTitleCounter() {
    const title = document.getElementById("title");
    const counter = document.getElementById("titleCounter");
    counter.textContent = title.value.length + " / 20";

    // 每次输入都隐藏错误提示
    document.getElementById("titleError").style.display = "none";
}

// title校验
function validateTitle() {
    const title = document.getElementById("title");
    const error = document.getElementById("titleError");
    const val = title.value.trim();

    if (val.length > 20) {
        error.textContent = "※エラー：20桁以内で入力してください";
        error.style.display = "block";
        // title.focus();
        // title.select();
        title.scrollIntoView({ behavior: "smooth", block: "center" });
        // 滚动到姓名输入框
        natitleme.style = "border: 1px solid red"; // 添加红色背景以突出显示错误

        return false;
    } else {
        error.textContent = "";
        error.style.display = "none";
        title.style = "border: none;background-color:rgb(232, 240, 254);"; 
        return true;
    }
}


// 内容计数器
function updateQuestionCounter() {
    const question = document.getElementById("question");
    const counter = document.getElementById("questionCounter");
    counter.textContent = question.value.length + " / 1000";

    // 每次输入都隐藏错误提示
    document.getElementById("questionError").style.display = "none";
}


// 内容校验
function validateQuestion() {
    const question = document.getElementById("question");
    const error = document.getElementById("questionError");
    const val = question.value.trim();

    if (val.length < 10 || val.length > 1000) {
        error.textContent = "※エラー：10桁以上1000桁以内で入力してください";
        error.style.display = "block";
        question.scrollIntoView({ behavior: "smooth", block: "center" });
        // 滚动到姓名输入框
        question.style = "border: 1px solid red"; // 添加红色背景以突出显示错误
        return false;
    } else {
        error.textContent = "";
        error.style.display = "none";
        question.style = "border: none;background-color:rgb(232, 240, 254);"; 
        return true;
    }
}


// 校验复选框
function validateAgree() {
    let flg = true;
    // 校验复选框
    const agree = document.getElementById("agree");
    const agreeError = document.getElementById("agreeError");

    if (!agree.checked) {
        agreeError.textContent = "※エラー：「個人情報のお取り扱い」に同意する必要があります。";
        agreeError.style.display = "block";
        agree.scrollIntoView({ behavior: "smooth", block: "center" });
        // 滚动到姓名输入框
        agree.style = "border: 1px solid red"; // 添加红色背景以突出显示错误
        flg = false;
    } else {
        agreeError.style.display = "none";
        agree.style = "border: 0px solid red"; // 去除红色背景
    }

    return flg;
}

function clearAttachmentError() {
    const errorDiv = document.getElementById('attachmentError');
    errorDiv.textContent = "";
    errorDiv.style.display = "none";
    // document.getElementById('fileSize').textContent = "";
}

function validateFileSize(input) {
    const file = input.files[0];
    // 获取文件大小并显示
    // 如果没有文件，清空错误信息和计数器
    // 如果文件大小超过1MB，显示错误信息并清空输入
    // 如果文件大小合法，显示文件大小
    // 获取错误信息和计数器元素
    const flg = true;

    const errorDiv = document.getElementById('attachmentError');
    const counter = document.getElementById('fileSize');
    if (file) {
        if (file.size > 1024 * 1024) { // 1MB
            errorDiv.textContent = "ファイルサイズは1MB以下にしてください。";
            errorDiv.style.display = "block";
            input.value = "";
            counter.textContent = "";
            flg = false;
        } else {
            errorDiv.style.display = "none";
            errorDiv.textContent = "";
            counter.textContent = `${(file.size / 1024).toFixed(1)} KB`;
        }
    } else {
        errorDiv.textContent = "";
        counter.textContent = "";
    }
    return flg;
}

function clearErrormsg() {
    document.getElementById("agreeError").style.display = "none";
}
function inquiryTypeOnchange() {
    document.getElementById("inquiryType").style.backgroundColor = "rgb(232, 240, 254)";
}

// 提交校验
function validateAll() {
    let flg = true;
    // 校验所有字段
    let isNameValid = validateName();
    let isTelValid = validateTel();
    let isEmailValid = validateEmail();
    let isTitleValid = validateTitle();
    let isQuestionValid = validateQuestion();
    let attachment = document.getElementById("attachment");
    let isFileValid = validateFileSize(attachment);
    let isAgreeValid = validateAgree();
    // 清空错误提示
    if (!isNameValid || !isTelValid || !isEmailValid || !isQuestionValid || !isFileValid || !isAgreeValid || !isTitleValid) {
        flg = false;
    }

    // 校验通过
    if (flg) {
        // // 清空计数器
        // clearForm();
        // // 清空内容
        // document.getElementById("name").value = "";
        // document.getElementById("tel").value = "";
        // document.getElementById("email").value = "";
        // document.getElementById("question").value = "";
        // // 清空复选框
        // document.getElementById("agree").checked = false;
        // 清空错误提示
        document.querySelectorAll(".error-message").forEach(error => {
            error.textContent = "";
            error.style.display = "none";
        });

    }
    return flg;
};

// 处理表单提交和步骤切换

// 替换为你的EmailJS参数
const EMAILJS_SERVICE_ID = 'service_swzdvlk';
const EMAILJS_TEMPLATE_ID = 'template_kh2rzfr';
const EMAILJS_PUBLIC_KEY = '4xGVlfVGnt0WUK6Sf'; // 旧版叫userID

// 初始化EmailJS
(function () {
    emailjs.init(EMAILJS_PUBLIC_KEY);
})();


document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const inputStep = document.getElementById('inputStep');
    const confirmStep = document.getElementById('confirmStep');
    const doneStep = document.getElementById('doneStep');
    const toConfirm = document.getElementById('toConfirm');
    const backToInput = document.getElementById('backToInput');
    const confirmContent = document.getElementById('confirmContent');
    const steps = document.querySelectorAll('.progress-bar .step');
    const fileSize = document.getElementById('fileSize');
    const submitBtn = document.getElementById("submitBtn");


    // 进入确认页
    toConfirm.addEventListener('click', function () {
        // 校验表单
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        // 校验表单
        if (!validateAll()) {
            form.reportValidity();
            return;
        }
        // 填充确认内容
        let html = '';
        const fields = [
            { label: 'お名前', value: form.name.value },
            { label: 'お電話', value: form.tel.value },
            { label: 'メール', value: form.email.value },
            { label: 'お問い合わせ種類', value: form.inquiryType.options[form.inquiryType.selectedIndex].text },
            { label: 'タイトル', value: form.title.value },
            { label: '内容', value: form.question.value }
        ];
        fields.forEach(f => {
            html += `<p><strong>${f.label}：</strong> ${f.value}</p>`;
        });
        // 附件
        if (form.attachment.value) {
            html += `<p><strong>ファイル：</strong> ${form.attachment.files[0].name}　${fileSize.textContent}</p>`;
        } else {
            html += `<p><strong>ファイル：</strong> なし</p>`;
        }
        confirmContent.innerHTML = html;

        // 步骤切换
        inputStep.style.display = 'none';
        confirmStep.style.display = '';
        doneStep.style.display = 'none';
        steps[0].classList.remove('active');
        steps[1].classList.add('active');
        steps[2].classList.remove('active');
        // 解决滚动问题
        confirmStep.scrollIntoView({ behavior: "smooth", block: "center" });
        // 或者
        // confirmStep.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });

    // 返回输入页
    backToInput.addEventListener('click', function () {
        inputStep.style.display = '';
        confirmStep.style.display = 'none';
        doneStep.style.display = 'none';
        steps[0].classList.add('active');
        steps[1].classList.remove('active');
        steps[2].classList.remove('active');
        submitBtn.disabled = false;
        submitBtn.innerText = "送信";
    });

    // // 完了页 （EmailJS直接传attachment作为邮件附件，但免费版附件容量只有50kb）
    // form.addEventListener('submit', function (e) {
    //     e.preventDefault();

    //     const attachment = document.getElementById('attachment');
    //     if (attachment.files.length > 0) {
    //         const file = attachment.files[0];

    //         // 限制上传文件类型 屏蔽.xls, .xlsm等高风险文档
    //         const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    //         if (!allowedTypes.includes(file.type)) {
    //             alert('このファイル形式は許可されていません。PDF、JPG、PNG、DOCXのみアップロード可能です。');
    //             return false;
    //         }

    //         //提交前校验
    //         if (file.size > 1024 * 1024) {
    //             alert('ファイルサイズは1MB以下にしてください。');
    //             return false;
    //         }

    //         // 解决中文文件名问题
    //         const renamedFile = new File([file], encodeURIComponent(file.name), {
    //             type: file.type
    //         });

    //         // 替换文件对象
    //         const dataTransfer = new DataTransfer();
    //         dataTransfer.items.add(renamedFile);
    //         attachment.files = dataTransfer.files;
    //     }

    //     // EmailJS支持直接传FormData
    //     emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this)
    //         .then(function (response) {
    //             // 成功处理
    //             inputStep.style.display = 'none';
    //             confirmStep.style.display = 'none';
    //             doneStep.style.display = '';
    //             steps[0].classList.remove('active');
    //             steps[1].classList.remove('active');
    //             steps[2].classList.add('active');
    //         }, function (error) {
    //             alert('送信に失敗しました。再度お試しください。可能な原因：ファイルサイズオーバー、通信障害など');
    //         });
    // });


    // 完了页（使用Supabase的bucket 免费）

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        submitBtn.disabled = true;
        submitBtn.innerText = "送信中...";

        const file = document.getElementById("attachment").files[0];
        let attachment_url = "（添付なし）";
        let original_filename = "";
        let fileSize2 = "";

        if (file) {
            original_filename = file.name;
            fileSize2 = file.size;
            try {
                attachment_url = await uploadToSupabase(file);
            } catch (e) {
                alert("ファイルアップロードに失敗しました");
                return;
            }
        }


        //指定参数情报
        const templateParams = {
            name: form.name.value.trim(),
            tel: form.tel.value.trim(),
            email: form.email.value.trim(),
            inquiryType: form.inquiryType.options[form.inquiryType.selectedIndex].text,
            title: form.title.value.trim(),
            question: form.question.value.trim(),
            attachment_url: attachment_url,
            original_filename: original_filename,
            fileSize: fileSize.textContent
        };

        //用send替代sendform方法
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
            .then(() => {
                // 显示成功页面
                inputStep.style.display = 'none';
                confirmStep.style.display = 'none';
                doneStep.style.display = '';
                steps[0].classList.remove('active');
                steps[1].classList.remove('active');
                steps[2].classList.add('active');
            }).catch(() => {
                alert('送信に失敗しました。再度お試しください。可能な原因：ファイルサイズオーバー、通信障害など');
            }).finally(() => {
                submitBtn.disabled = false;
                submitBtn.innerText = "送信";
            });
    });


    //页面加载后，所有的 <input> 和 <textarea> 都会在选中时清空 placeholder，失去焦点时恢复。
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        const originalPlaceholder = input.placeholder;
        input.addEventListener('focus', () => input.placeholder = '');
        input.addEventListener('blur', () => input.placeholder = originalPlaceholder);
    });

    //inquiryType下拉框改变式样
    document.getElementById('inquiryType').addEventListener('change', function () {
        if (this.value === "") {
            this.style = "font-style: italic; color: #888;font-size: 0.8em;";
        } else {
            this.style = "font-style: normal; color: #000;font-size: 1em;";
        }
    });
    // // 初始化时设置样式
    document.getElementById('inquiryType').dispatchEvent(new Event('change'));


});