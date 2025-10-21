# Claude Code Agents - TechTrain Production Deployment

This directory contains specialized Claude Code agents that guide you through each step of the production deployment roadmap. Each agent is an expert in a specific domain and provides detailed, actionable instructions.

## 🎯 How to Use These Agents

When working on a specific task from the [PRODUCTION_ROADMAP.md](../PRODUCTION_ROADMAP.md), invoke the corresponding agent:

```
@agent-name
```

Or describe your task and Claude Code will recommend the appropriate agent.

## 📋 Available Agents

### Phase 1: Critical Path (Weeks 1-2)

#### 1. **Authentication Integration Specialist**
**File**: `auth-integration-specialist.md`
**Use when**: Connecting login/register UI to Supabase Auth backend

**Covers**:
- Creating user context provider
- Updating login page with server actions
- Updating register page with server actions
- Adding logout functionality to header
- Protected route patterns
- Dutch error message translations
- Session persistence
- Testing authentication flow

**Estimated Time**: 2-3 days

---

#### 2. **Production Database Migration Specialist**
**File**: `production-db-migration-specialist.md`
**Use when**: Setting up production Supabase and migrating data

**Covers**:
- Resetting exposed service role key (CRITICAL)
- Creating production Supabase project
- Deploying database schema with RLS
- Running migration script safely
- Verification and testing
- Backup configuration
- Rollback procedures
- Security hardening

**Estimated Time**: 1 day

---

#### 3. **Enrollment Integration Specialist**
**File**: `enrollment-integration-specialist.md`
**Use when**: Implementing course enrollment functionality

**Covers**:
- Updating CourseBookingForm component
- Adding enrollment status checking
- Creating user dashboard
- Creating enrollments page
- Displaying enrolled courses
- Canceling enrollments
- Admin enrollment statistics
- Dutch error translations

**Estimated Time**: 2-3 days

---

#### 4. **Stripe Payment Integration Specialist**
**File**: `stripe-payment-integration-specialist.md`
**Use when**: Implementing Stripe payments with iDEAL support

**Covers**:
- Creating Stripe account
- Enabling iDEAL payment method
- Installing dependencies
- Creating payment intent server actions
- Building checkout form with Stripe Elements
- Implementing webhook handlers
- Testing with test cards
- Refund functionality
- Going live checklist

**Estimated Time**: 5-7 days

---

#### 5. **Security Hardening Specialist**
**File**: `security-hardening-specialist.md`
**Use when**: Securing the application before production

**Covers**:
- Auditing exposed secrets
- Implementing rate limiting (Upstash)
- Configuring security headers
- Setting up Content Security Policy
- Input validation and sanitization
- CSRF protection
- Error logging and monitoring
- Database security (RLS audit)
- GDPR compliance (data export/deletion)

**Estimated Time**: 2-3 days

---

### Phase 2: High Priority (Weeks 3-4)

#### 6. **Email Automation Specialist**
**File**: `email-automation-specialist.md`
**Use when**: Setting up transactional email notifications

**Covers**:
- Choosing email service (Resend recommended)
- Creating React email templates (Dutch)
- Welcome email on registration
- Enrollment confirmation email
- Payment receipt email
- Password reset emails
- Configuring Supabase Auth email templates
- Testing email delivery

**Estimated Time**: 3-4 days

---

#### 7. **Testing Automation Specialist**
**File**: `testing-automation-specialist.md`
**Use when**: Setting up comprehensive test suite

**Covers**:
- Configuring Vitest for unit tests
- Writing tests for utilities and components
- Configuring Playwright for E2E tests
- Writing E2E tests for user flows
- Testing registration and login
- Testing enrollment flow
- Testing payment flow (with test cards)
- Integration testing with Supabase
- CI/CD pipeline with GitHub Actions
- Achieving 60%+ code coverage

**Estimated Time**: 3-5 days

---

### Phase 3: Deployment

#### 8. **Vercel Deployment Specialist**
**File**: `vercel-deployment-specialist.md`
**Use when**: Deploying to production on Vercel

**Covers**:
- Pre-deployment checklist
- Vercel account setup
- Environment variable configuration
- Custom domain setup (techtrain.nl)
- SSL certificate configuration
- First deployment
- Updating external services (Supabase, Stripe, Resend)
- Setting up analytics and monitoring
- Configuring CI/CD pipeline
- Performance optimization
- Going live checklist

**Estimated Time**: 3 days

---

## 🔄 Agent Workflow

### Example: Implementing Authentication

1. **Read the agent**:
   ```
   Open auth-integration-specialist.md
   ```

2. **Follow the approach**:
   - Step 1: Assess current implementation
   - Step 2: Create user context
   - Step 3: Update login page
   - (etc.)

3. **Use provided code patterns**:
   - Copy/paste starter code
   - Adapt to your needs
   - Test thoroughly

4. **Check success criteria**:
   - ✅ Users can register
   - ✅ Users can log in
   - ✅ Session persists
   - (etc.)

5. **Move to next agent**:
   - Once authentication works, move to enrollment
   - Follow the same pattern

## 💡 Tips for Success

### 1. Follow the Order
The agents are designed to be used in sequence:
1. Auth → 2. DB Migration → 3. Enrollment → 4. Payment → 5. Security → 6. Email → 7. Testing → 8. Deployment

Each builds on the previous one.

### 2. Don't Skip Steps
Even if something seems obvious, follow all steps. They're there for a reason.

### 3. Test Thoroughly
Each agent includes testing instructions. Don't skip them!

### 4. Use the Checklists
Every agent has success criteria and checklists. Use them to track progress.

### 5. Ask Questions
If something is unclear, ask Claude Code for clarification. The agents are here to help!

## 🎓 Learning from the Agents

These agents are not just guides - they're educational resources:

- **Code Patterns**: Learn industry best practices
- **Security**: Understand security implications
- **Architecture**: See how features integrate
- **Testing**: Learn proper test writing
- **Dutch Language**: See proper Dutch translations

## 📊 Progress Tracking

Use the [PRODUCTION_ROADMAP.md](../PRODUCTION_ROADMAP.md) to track your overall progress:

- [ ] Phase 1: Critical Path (Weeks 1-2)
  - [ ] Authentication Integration
  - [ ] Production DB Migration
  - [ ] Enrollment Integration
  - [ ] Payment Integration
  - [ ] Security Hardening

- [ ] Phase 2: High Priority (Weeks 3-4)
  - [ ] Email Notifications
  - [ ] Testing Infrastructure

- [ ] Phase 3: Deployment
  - [ ] Vercel Deployment

## 🆘 When You Get Stuck

1. **Re-read the agent**: Often the answer is in there
2. **Check the resources**: Each agent links to official docs
3. **Ask Claude Code**: Describe your issue
4. **Review the code examples**: They're designed to be copy-paste ready
5. **Check the troubleshooting section**: Common issues are documented

## 🚀 Quick Start

To begin your production deployment journey:

1. **Start here**: `auth-integration-specialist.md`
2. **Have ready**:
   - Development environment set up
   - Supabase development database working
   - All dependencies installed
3. **Allocate time**: ~6-8 weeks for full deployment (1 developer)
4. **Follow the roadmap**: Check off tasks as you complete them

## 📝 Notes

- All agents use **you-form** language (addressing you directly)
- All examples include **Dutch language** where appropriate
- All code is **production-ready** (not just tutorials)
- All security recommendations are **industry standard**

## 🔗 Related Documentation

- [PRODUCTION_ROADMAP.md](../PRODUCTION_ROADMAP.md) - Complete task breakdown
- [CLAUDE.md](../CLAUDE.md) - Project overview and architecture
- [techtrain-courses/README.md](../techtrain-courses/README.md) - Implementation status

---

**You're 70% done!** The hard architectural work is complete. These agents will guide you through the remaining 30% - connecting the pieces and launching! 🎉

Good luck with your deployment! 🚀
