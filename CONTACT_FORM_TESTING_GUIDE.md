# 📋 Contact Form Testing Guide

## 🔧 Prerequisites

1. **Development Server Running**: `npm run dev`
2. **Environment Variables Configured**: Check `.env.local` has all required variables
3. **Browser DevTools Open**: Press `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)

---

## 🧪 Test 1: Basic Form Submission (Happy Path)

### Step 1: Navigate to Contact Page
- **URL**: `http://localhost:3000/en/contact`
- **Expected**: Contact form loads with all 8 fields visible

### Step 2: Fill Out Form with Valid Test Data

**Copy and paste this exact data**:

```
Full Name: John Doe
Email: john.doe@testcompany.com
Company Name: Test Company Inc
Phone Number: +1 (555) 123-4567
Inquiry Type: Product Demo (select from dropdown)
Company Size: 11-50 employees (optional - select from dropdown)
Industry: Transportation (optional - select from dropdown)
Message: This is a test message to verify the contact form is working correctly. We are interested in learning more about Tranzkit's transportation management solutions.
Security Question: [Calculate and enter the answer to the math question]
```

### Step 3: Wait 3+ Seconds
- **Why**: Time-based CAPTCHA requires minimum 3 seconds
- **Action**: Wait at least 3 seconds before clicking "Send Message"

### Step 4: Click "Send Message"

### Step 5: Check Browser Console
**Open Console Tab** (F12 → Console)

**Expected Console Logs**:
```
🚀 Form submission started
📝 Form data: {name: "John Doe", email: "john.doe@testcompany.com", ...}
⏱️ Time elapsed since form load: 5234ms
🔢 Math CAPTCHA - User answer: 7, Correct answer: 7
📤 Submitting to API: {...}
📥 API Response status: 200
✅ API Success: {message: "Form submitted successfully", remaining: 4}
✅ Form reset complete
```

### Step 6: Check Toast Notification
**Expected**: Green success toast appears at top-right:
> ✅ "Message sent successfully! We'll get back to you soon."

### Step 7: Verify Form Reset
**Expected**: All fields are cleared except dropdowns reset to placeholder

### Step 8: Check Email Inbox
- **Email Address**: `m.elmahdy@codefyhub.com`
- **Subject**: "🎯 New Demo Lead: John Doe from Test Company Inc"
- **Expected**: Professional HTML email with all form data

### Step 9: Check Slack Channel
- **Workspace**: `codefyhubworkspace.slack.com`
- **Channel**: `#tranzkit_website_leads`
- **Expected**: Rich message with all contact info and action buttons

---

## 🧪 Test 2: Form Validation Errors

### Test 2.1: Empty Required Fields
1. Leave all fields empty
2. Click "Send Message"
3. **Expected**: Red error messages appear under each required field:
   - "Name must be at least 2 characters"
   - "Invalid email address"
   - "Company name is required"
   - "Phone number is required"
   - "Please select an inquiry type"
   - "Message must be at least 10 characters"
   - "Please answer the security question"

### Test 2.2: Invalid Email Format
1. Enter: `invalid-email`
2. **Expected**: "Invalid email address" error

### Test 2.3: Invalid Phone Format
1. Enter: `abc123xyz`
2. **Expected**: "Invalid phone number format" error

### Test 2.4: Short Name
1. Enter: `J`
2. **Expected**: "Name must be at least 2 characters" error

### Test 2.5: Short Message
1. Enter: `Hi`
2. **Expected**: "Message must be at least 10 characters" error

---

## 🧪 Test 3: CAPTCHA Protection

### Test 3.1: Honeypot Field (Bot Detection)
1. Open Browser DevTools → Elements tab
2. Find the hidden honeypot input field (search for `honeypot`)
3. Remove `style="position: absolute; left: -9999px; width: 1px; height: 1px;"`
4. Fill the honeypot field with text: `bot-test`
5. Fill other fields correctly
6. Click "Send Message"

**Expected Console Log**:
```
❌ API Error: {error: "Invalid submission"}
```

**Expected Toast**: Red error toast:
> ❌ "Invalid submission"

### Test 3.2: Math CAPTCHA (Wrong Answer)
1. Fill all fields correctly
2. Enter **wrong answer** to math question (e.g., if question is "5 + 3", enter "7")
3. Click "Send Message"

**Expected Console Log**:
```
❌ Math CAPTCHA validation failed
```

**Expected Toast**: Red error toast:
> ❌ "Incorrect answer to security question"

### Test 3.3: Time-Based Validation (Too Fast)
1. Refresh the page
2. **Immediately** fill all fields (within 3 seconds)
3. Click "Send Message"

**Expected Console Log**:
```
❌ Form submitted too quickly: 1234ms
```

**Expected Toast**: Red error toast:
> ❌ "Please take a moment to review your submission"

---

## 🧪 Test 4: Rate Limiting

### Step 1: Submit Form 5 Times Successfully
1. Fill form with valid data
2. Wait 3+ seconds
3. Answer math question correctly
4. Click "Send Message"
5. **Repeat 5 times**

**Expected**: Each submission shows:
- Console: `✅ API Success: {message: "Form submitted successfully", remaining: X}`
- Toast: Success message
- `remaining` count decreases: 4 → 3 → 2 → 1 → 0

### Step 2: Attempt 6th Submission
1. Fill form again
2. Click "Send Message"

**Expected Console Log**:
```
📥 API Response status: 429
❌ API Error: {error: "Too many requests. Please try again after 3:45 PM."}
```

**Expected Toast**: Red error toast:
> ❌ "Too many requests. Please try again after [time]."

### Step 3: Reset Rate Limit (For Testing)
**Option A**: Wait 1 hour
**Option B**: Restart dev server: `Ctrl+C` then `npm run dev`

---

## 🧪 Test 5: Network Tab Inspection

### Step 1: Open Network Tab
1. Press `F12` → Network tab
2. Filter by "Fetch/XHR"

### Step 2: Submit Form
1. Fill form correctly
2. Click "Send Message"

### Step 3: Inspect Request
**Click on `/api/contact` request**

**Request Headers**:
```
Content-Type: application/json
```

**Request Payload** (Preview tab):
```json
{
  "name": "John Doe",
  "email": "john.doe@testcompany.com",
  "company": "Test Company Inc",
  "phone": "+1 (555) 123-4567",
  "inquiryType": "demo",
  "companySize": "11-50",
  "industry": "transportation",
  "message": "This is a test message...",
  "honeypot": "",
  "mathAnswer": "7",
  "formLoadTime": 5234
}
```

**Response** (Preview tab):
```json
{
  "message": "Form submitted successfully",
  "remaining": 4
}
```

**Status Code**: `200 OK`

---

## 🧪 Test 6: Email Verification

### Check Email Inbox
- **Email**: `m.elmahdy@codefyhub.com`
- **Check**: Inbox and Spam/Junk folders

### Expected Email Content
- **Subject**: "🎯 New Demo Lead: John Doe from Test Company Inc"
- **From**: "Tranzkit Website <m.elmahdy@codefyhub.com>"
- **HTML Template**: Professional design with Tranzkit branding
- **Content**:
  - Header: "🎯 New Lead from Tranzkit Website"
  - Contact Information table
  - Message in highlighted box
  - Timestamp

### If Email Not Received
1. **Check Server Console** for email errors:
   ```
   ✅ Email sent successfully to: m.elmahdy@codefyhub.com
   ```
   OR
   ```
   ❌ Email sending failed: [error details]
   ```

2. **Test SMTP Connection** (if email fails):
   - Try port 465 with SSL:
     ```env
     SMTP_PORT=465
     SMTP_SECURE=true
     ```
   - Restart dev server

---

## 🧪 Test 7: Slack Notification Verification

### Check Slack Channel
- **Workspace**: `codefyhubworkspace.slack.com`
- **Channel**: `#tranzkit_website_leads`

### Expected Slack Message
- **Header**: "🎯 New Lead from Tranzkit Website"
- **Inquiry Type Badge**: "🎥 Product Demo"
- **Contact Fields**:
  - 👤 Name: John Doe
  - 📧 Email: john.doe@testcompany.com (clickable mailto link)
  - 🏢 Company: Test Company Inc
  - 📞 Phone: +1 (555) 123-4567 (clickable tel link)
  - 👥 Company Size: 11-50 employees
  - 🏭 Industry: Transportation
- **Message Section**: Full message text
- **Timestamp**: "⏰ Submitted at: [date and time]"
- **Action Buttons**:
  - "📧 Reply via Email" (opens email client)
  - "📞 Call" (opens phone dialer)

### If Slack Notification Not Received
1. **Check Server Console**:
   ```
   ✅ Slack notification sent successfully
   ```
   OR
   ```
   ❌ Slack notification failed: [error details]
   ```

2. **Test Webhook Manually**:
   ```bash
   curl -X POST https://hooks.slack.com/services/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 \
     -H 'Content-Type: application/json' \
     -d '{"text":"Test from contact form"}'
   ```

---

## 🧪 Test 8: Arabic Locale (RTL)

### Step 1: Navigate to Arabic Contact Page
- **URL**: `http://localhost:3000/ar/contact`

### Step 2: Verify RTL Layout
- **Expected**: Form fields aligned right-to-left
- **Expected**: Icons on the right side of labels
- **Expected**: Text input alignment: right-aligned

### Step 3: Submit Form
- Fill with same test data
- **Expected**: Form works identically to English version

---

## 🐛 Common Issues & Solutions

### Issue: Button Does Nothing
**Check**:
1. Browser console for JavaScript errors
2. Network tab for failed requests
3. Form validation errors (red text under fields)

### Issue: "Form submitted too quickly"
**Solution**: Wait at least 3 seconds after page load before submitting

### Issue: "Incorrect answer to security question"
**Solution**: Double-check math calculation

### Issue: Email Not Received
**Solutions**:
1. Check spam/junk folder
2. Verify SMTP credentials in `.env.local`
3. Try port 465 with SSL
4. Check server console for errors

### Issue: Slack Not Working
**Solutions**:
1. Verify webhook URL in `.env.local`
2. Test webhook with curl command
3. Check server console for errors

---

## ✅ Success Criteria Checklist

- [ ] Form loads without errors
- [ ] All 8 fields are visible and functional
- [ ] Required field validation works
- [ ] Email format validation works
- [ ] Phone format validation works
- [ ] Inquiry Type dropdown works
- [ ] Optional dropdowns work
- [ ] Math CAPTCHA validation works
- [ ] Time-based validation works (3 second minimum)
- [ ] Honeypot protection works
- [ ] Form submits successfully
- [ ] Success toast notification appears
- [ ] Form resets after successful submission
- [ ] Email notification received
- [ ] Slack notification received
- [ ] Rate limiting works (5 submissions max)
- [ ] Arabic locale works correctly
- [ ] Console logs show detailed debugging info

---

## 📞 Support

If you encounter any issues not covered in this guide, check:
1. Browser console for error messages
2. Network tab for failed requests
3. Server terminal for backend errors
4. `.env.local` for correct configuration

