# Birthday Website --- Full-Fledged Build Specification / Cursor Prompt

## 1. Project Context

I want to build a highly polished, memorable, interactive birthday web
experience for my fiancée.

This is NOT intended to be a generic birthday greeting website.

I am a software engineer/developer and my fiancée is also in tech and is
familiar with GitHub, software projects, and developer culture.
Therefore, the experience should deliberately feel like a thoughtfully
engineered product made specifically for her.

Important personal context:

-   We are currently in a long-distance situation.
-   We are getting married on **25 November 2026**.
-   Her birthday is the occasion for this website.
-   I do NOT have many photos of us together.
-   I have around **2--3 childhood photographs of her** and a couple of
    recent photographs of her.
-   The photographs are primarily/entirely of HER, not of both of us
    together.
-   I want the visual storytelling to remain centered around HER rather
    than trying to manufacture a "couple memories" narrative.
-   I also have a couple of **screen-recorded videos from our video
    calls** that can be incorporated into the website.
-   I have a personal birthday message for her that I will provide as
    content later.
-   I am also interested in recording/including a dedicated video
    message because I think that can make the ending substantially more
    emotional and memorable.

I previously created a beautiful Valentine's Day website for her that
already used riddles and a message. Therefore, this birthday experience
should NOT simply repeat that concept with different text.

The birthday website should feel like a new experience.

------------------------------------------------------------------------

# 2. Main Creative Direction

The core concept should be:

## "A beautifully engineered digital experience about HER."

The site should celebrate:

-   who she was as a child
-   who she is now
-   her personality and journey
-   her interests / identity / achievements
-   the things I admire about her
-   her future
-   the fact that another year of her life has been completed
-   and finally, my personal message/video to her

The experience should NOT depend on having lots of shared photographs.

Avoid making the website primarily about: - "our memories" - couple
photo galleries - timelines of our relationship - collages of me + her -
generic romantic templates

Instead, the site should make her feel:

> "Someone spent serious engineering effort building an entire digital
> world specifically for me."

The emotional progression should be:

**Curiosity → Interaction → Discovery → Nostalgia → Appreciation →
Emotion → Personal message**

------------------------------------------------------------------------

# 3. Primary Inspiration

I specifically like the interaction pattern and visual feel of this
project:

https://sahandsame.github.io/Birthday-Website-Gift/

Reference repository/site:

https://github.com/sahandsame/Birthday-Website-Gift

Use it as inspiration/reference, NOT as something to blindly copy.

The part I particularly like is the initial unlock interaction:

-   The visitor sees a mysterious birthday message.
-   There is an interaction such as "TAP TO UNLOCK".
-   The user must click/tap repeatedly.
-   The reference uses **30 taps/clicks** before unlocking the next
    experience.
-   Progress is displayed.
-   The interaction creates anticipation.
-   Once unlocked, the actual birthday experience begins.

I want to reuse this general idea.

Potentially:

``` text
0 / 30

TAP TO UNLOCK
```

with progressively changing microcopy.

The exact wording and visual treatment should be original and
personalized.

The reference site also has a persistent glitter/particle effect. I like
that and want a similar effect reused tastefully throughout the
experience.

Reference site currently demonstrates: - mystery/unlock introduction -
0/30 progress - tap-to-unlock interaction - celebration transition -
birthday hero - developer-oriented personalization - animated visual
effects - glitter/celebration feel

Use these as inspiration for interaction quality, not as a design to
reproduce pixel-for-pixel.

------------------------------------------------------------------------

# 4. What I DO NOT Want

Do NOT build the following unless there is a compelling reason:

## No mini-games

I explicitly do not like the mini-game direction.

Avoid: - quizzes - memory matching - score-based games - reaction
games - generic arcade games - "how well do you know me?" games -
personality tests - game-like scoring systems

## No personality engine

I do not want a fake personality diagnostic / personality scoring
experience.

Avoid: - "you are 73% X" - personality tests - fake psychological
reports - arbitrary personality percentages

## No generic birthday-card website

Avoid a basic:

``` text
Happy Birthday
↓
Photo gallery
↓
Message
↓
Confetti
```

It should feel like an actual crafted digital experience.

## No excessive couple imagery

Do not artificially combine photos of me and her.

The visual identity should remain centered on her.

------------------------------------------------------------------------

# 5. Proposed High-Level Experience

Design the website as a sequence of chapters/scenes rather than a
conventional scrolling landing page.

Suggested journey:

``` text
ENTRY
  ↓
MYSTERIOUS UNLOCK
  ↓
BIRTHDAY.OS / EXPERIENCE INITIALIZATION
  ↓
HER STORY / HER WORLD
  ↓
CHILDHOOD
  ↓
NOW
  ↓
HER TECH / HER WORLD
  ↓
THINGS I ADMIRE ABOUT HER
  ↓
VIDEO CALL MOMENTS
  ↓
FUTURE / NEXT CHAPTER
  ↓
FINAL PERSONAL MESSAGE
  ↓
PERSONAL VIDEO
  ↓
FINAL BIRTHDAY REVEAL
```

This is a conceptual structure. Improve it if a better narrative emerges
during implementation.

The experience should not feel like the user is simply clicking "Next"
through slides.

Transitions should feel intentional and cinematic.

------------------------------------------------------------------------

# 6. Opening Scene --- Unlock Experience

The opening should be mysterious and minimal.

Example direction:

``` text
A little something was built for you.

But you're going to have to unlock it.

[ TAP TO UNLOCK ]

0 / 30
```

On every tap: - update progress - subtle animation - glitter/particles -
micro-interaction - perhaps changing short text at specific milestones

Potential progression:

``` text
0 / 30
"Okay, let's start."

5 / 30
"You're actually doing this."

10 / 30
"We're committed now."

15 / 30
"Halfway there."

20 / 30
"Almost."

25 / 30
"Five more."

29 / 30
"One last click."

30 / 30
"Okay. This is yours."
```

Do not copy these exact lines if better personalized wording is
available.

After 30: - create a satisfying unlock animation - transition into the
main experience - use particles/glitter/celebration sparingly - avoid
making it childish

The interaction should work equally well on desktop and mobile.

------------------------------------------------------------------------

# 7. Overall Visual Style

Target:

**Elegant + cinematic + modern + developer-aware + emotional**

Avoid: - childish birthday templates - excessive balloons - excessive
pink - generic heart animations everywhere - cheap-looking gradients -
overuse of emojis - visual clutter

The site can use subtle developer references: - terminal UI -
GitHub-inspired typography/details - code-like microcopy - system
initialization - commits / versions / logs - elegant technical metaphors

But do NOT make the entire experience look like a GitHub clone.

Developer references should be Easter eggs and storytelling devices
rather than the entire design.

------------------------------------------------------------------------

# 8. Glitter / Particle System

I liked the persistent glitter effect in the reference site.

Implement a reusable particle/glitter system.

Requirements: - subtle by default - performant - responsive - works on
mobile - respects `prefers-reduced-motion` - should not interfere with
readability - different intensity can be used for transitions/reveals -
avoid making the entire screen constantly flashy

Possible implementation: - Canvas - CSS particles - lightweight JS
particle engine - or a suitable animation library

Choose the simplest performant implementation.

------------------------------------------------------------------------

# 9. Her Childhood Section

I have approximately 2--3 childhood photographs of her.

Use them as meaningful visual artifacts.

The section should NOT simply be:

``` text
Childhood Photos
[image]
[image]
[image]
```

Instead, create a cinematic reveal.

Possible concept:

``` text
BEFORE EVERYTHING ELSE

Before the career.
Before adulthood.
Before all the things you are today.

There was this little girl.
```

Then reveal the images one by one.

Each image can have: - subtle parallax - film/grain effect - gentle
zoom - date/era label if I provide it - a short caption if I provide one

Do not invent facts about the photographs.

If exact dates/locations are not provided, don't fabricate them.

------------------------------------------------------------------------

# 10. Present-Day Section

Use the couple of recent photographs of her.

The goal should be to show contrast:

``` text
THEN
↓
NOW
```

But do this elegantly.

Possible theme:

> "Some things change. Some things become more unmistakably you."

This should be about her growth rather than a generic "look how
beautiful you are" gallery.

Use modern editorial layouts.

Potential visual treatment: - large portrait - asymmetric layout -
typography - subtle motion - text appearing around the image - smooth
transition from childhood imagery to present imagery

------------------------------------------------------------------------

# 11. Her Tech Identity

Because she is in tech and familiar with GitHub, include subtle
references that will feel personal to her.

Possible concepts:

### "Build History"

``` text
VERSION HISTORY

v1.0 — Childhood
v2.0 — Growing up
v3.0 — Becoming who you are
v4.0 — Current release
vNext — Everything still ahead
```

Do NOT invent achievements or career details.

I will provide any facts, interests, technologies, companies, projects,
or achievements that should be included.

The design can resemble: - changelogs - release notes - Git commits -
terminal logs - deployment status - system initialization

Example:

``` text
$ ./birthday.sh

Loading subject...

Name: [HER NAME]
Status: ONLINE
Version: [AGE]
Build: 2026
Environment: LIFE
```

This should remain tasteful rather than becoming a joke.

------------------------------------------------------------------------

# 12. "Things I See In You" Section

This should be one of the emotional core sections.

Instead of generic compliments, create a visual experience around
qualities I provide.

For example:

``` text
THINGS I HOPE YOU NEVER UNDERESTIMATE ABOUT YOURSELF

01
Your ...

02
Your ...

03
Your ...

04
Your ...
```

Each item can be revealed progressively.

The actual content will be provided by me.

Do not generate generic romantic filler.

The design should give each statement enough visual space.

------------------------------------------------------------------------

# 13. Video Call Recordings

I have a couple of screen recordings from video calls with her.

These are important because they are authentic pieces of our lives, even
though they are not photographs together.

Use them carefully.

Potential treatment:

``` text
SOME MOMENTS DON'T NEED A CAMERA CREW.

They just happen.
```

Then show a short video clip.

Potentially: - crop the recording into a cinematic frame - add subtle
film UI - timestamp if meaningful - show a few seconds - transition
between clips

Do not overuse them.

The recordings should feel like small windows into real moments rather
than a video dump.

Support: - MP4/WebM - lazy loading - poster images - muted autoplay only
if appropriate and browser-safe - user controls - mobile performance

Do not autoplay sound unexpectedly.

------------------------------------------------------------------------

# 14. Final Personal Message

I have a personal written message for her.

This should be treated as the emotional centerpiece.

Do NOT bury it in a normal text section.

Create a dedicated final "letter" experience.

Possible concept:

``` text
SYSTEM MESSAGE

There is one thing I couldn't
build into an interface.

So I wrote it instead.
```

Then reveal the message.

The message should be rendered beautifully: - elegant typography -
generous spacing - subtle background animation - perhaps a
typewriter/reveal effect, but don't overdo it - ability to pause/skip if
animation is long

I will provide the actual message later.

Do not rewrite or alter the message unless explicitly instructed.

------------------------------------------------------------------------

# 15. Final Video Message

I strongly want the option to include a personal video message from me.

This should come near the very end.

Potential flow:

``` text
You've reached the end.

Or at least,
the end of what I could put into code.

There's one last thing.

[ PLAY ]
```

Then play my recorded birthday message.

The final video should feel like the website hands over control to a
real human moment.

Technical requirements: - responsive video player - poster image - no
forced autoplay with sound - accessible controls - mobile friendly -
graceful fallback if video fails - local asset support

The final video can be more emotional and less "developer themed."

The engineering should disappear at the end and let the message take
over.

------------------------------------------------------------------------

# 16. Wedding Context

We are getting married on:

**25 November 2026**

This is an important part of the context, but DO NOT turn the entire
birthday website into a wedding website.

The birthday is still the primary purpose.

However, the fact that this is a special period in her life can be used
subtly near the ending.

Potential idea:

``` text
NEXT CHAPTER

2026 isn't just another year.

There's already something waiting for you
on the other side of it.

25.11.2026
```

This should feel like a subtle personal easter egg / future chapter
rather than a wedding invitation.

Do not make this section overly sentimental unless the provided content
supports it.

------------------------------------------------------------------------

# 17. Potential Final Screen

After the message/video:

``` text
BIRTHDAY EXPERIENCE

STATUS: COMPLETE

Another year.
Another version.
Another chapter.

Happy Birthday, [NAME]. ❤️

— [MY NAME]

25.11.2026
```

The exact final copy will be supplied later.

Could include a final animation such as: - slow glitter - stars - subtle
particles - sunrise/night-sky transition - elegant fade

Avoid a loud generic confetti explosion at the very end unless it fits
the overall design.

------------------------------------------------------------------------

# 18. Easter Eggs

I want a few hidden developer-oriented Easter eggs.

Examples:

### Keyboard shortcuts

Maybe: - `Ctrl/Cmd + K` - Konami code - hidden terminal - clicking a
subtle version number - secret URL/hash

But do not turn the site into an ARG.

Keep Easter eggs discoverable and delightful.

Potential terminal:

``` text
$ help

available commands:
  about
  future
  birthday
  secret
```

The terminal can reveal a hidden message.

Again, keep this optional.

------------------------------------------------------------------------

# 19. Technical Stack

Prefer:

-   Next.js
-   TypeScript
-   React
-   Tailwind CSS
-   Framer Motion / Motion
-   Lucide icons where needed
-   CSS animations where sufficient

Use Three.js only if it genuinely improves the experience.

Avoid adding dependencies just because they are popular.

Prefer: - simple - maintainable - performant - production-quality

The code should be something another engineer would be happy to review.

------------------------------------------------------------------------

# 20. Architecture

Use a clean structure.

Suggested:

``` text
src/
  app/
  components/
    intro/
    unlock/
    chapters/
    media/
    transitions/
    particles/
    final/
  data/
    birthday.ts
  hooks/
  lib/
  styles/

public/
  images/
  videos/
  audio/
```

Keep personal content separate from UI components wherever possible.

For example:

``` ts
export const birthdayContent = {
  name: "...",
  age: ...,
  childhood: [...],
  currentPhotos: [...],
  qualities: [...],
  videos: [...],
  finalMessage: "...",
};
```

This should make it easy for me to replace content without touching the
UI implementation.

------------------------------------------------------------------------

# 21. Media Handling

The final project will contain:

### Images

-   2--3 childhood images
-   2--3 recent images

### Videos

-   2--3 screen recordings/video-call recordings
-   1 final personal birthday video from me

Potential directory:

``` text
public/
  media/
    childhood/
    present/
    video-calls/
    final/
```

Use descriptive placeholder filenames until I provide the actual assets.

Example:

``` text
childhood-01.jpg
childhood-02.jpg
childhood-03.jpg

present-01.jpg
present-02.jpg

video-call-01.mp4
video-call-02.mp4

final-message.mp4
```

Do not commit huge raw videos if a better deployment strategy is needed.
Explain any recommended compression/hosting approach.

------------------------------------------------------------------------

# 22. Responsive Design

The experience must work beautifully on:

-   iPhone
-   Android
-   tablet
-   laptop
-   desktop

The likely scenario is that she opens it from a phone.

Therefore:

**Mobile-first is mandatory.**

Pay special attention to: - touch targets - video playback - text
sizing - vertical spacing - image cropping - performance - loading
time - particle count - animations

The 30-click unlock interaction should feel natural on touch devices.

------------------------------------------------------------------------

# 23. Accessibility

Implement:

-   semantic HTML
-   keyboard navigation
-   visible focus states
-   appropriate aria labels
-   reduced-motion support
-   sufficient contrast
-   alt text for images
-   accessible video controls

The animation should enhance the experience, not make the website
unusable.

------------------------------------------------------------------------

# 24. Performance

This is an emotional website, but it should still be technically
excellent.

Requirements:

-   lazy load images
-   optimize images
-   use responsive image sizes
-   lazy load videos
-   avoid loading all videos at startup
-   minimize JS where possible
-   avoid excessive particle counts
-   avoid memory leaks
-   use IntersectionObserver where useful
-   smooth transitions
-   no unnecessary API calls

Target: - fast initial load - smooth 60fps animations on modern
devices - reasonable mobile data usage

------------------------------------------------------------------------

# 25. Audio

Audio should be optional.

Do NOT automatically play music with sound on page load.

If background music is included: - start muted or require interaction -
provide visible controls - remember mute preference - handle mobile
browser restrictions

If a soundtrack would significantly improve the emotional experience,
leave a clean extension point for it.

------------------------------------------------------------------------

# 26. Content Strategy

Do NOT invent personal facts.

Use placeholders such as:

``` text
[HER_NAME]
[HER_AGE]
[QUALITY_01]
[CHILDHOOD_CAPTION_01]
[CURRENT_CAPTION_01]
[VIDEO_CALL_CAPTION_01]
[FINAL_MESSAGE]
[MY_NAME]
```

When I provide personal content, integrate it naturally.

The UI should never expose placeholder values in production.

Create a clear content/config file so I can fill everything in one
place.

------------------------------------------------------------------------

# 27. Development Experience

Because I am going to build and customize this using Cursor:

Provide:

-   clear README
-   setup instructions
-   development commands
-   production build instructions
-   deployment instructions
-   media replacement instructions
-   content customization instructions

The README should explain:

``` text
1. Install dependencies
2. Start development server
3. Add photos
4. Add videos
5. Edit birthday content
6. Run production build
7. Deploy
```

------------------------------------------------------------------------

# 28. Deployment

The project should be deployable easily to platforms such as:

-   Vercel
-   Netlify
-   GitHub Pages if technically appropriate

Prefer Vercel if Next.js functionality makes that the simplest option.

If GitHub Pages is selected, ensure the implementation is compatible
with static export.

The site can be private through an unguessable URL, but do not assume
that an unguessable URL is true security.

If a password/protection layer is added, implement it appropriately for
the deployment platform.

------------------------------------------------------------------------

# 29. Desired UX Quality

The website should feel:

-   premium
-   intentional
-   smooth
-   cinematic
-   intimate
-   modern
-   technically impressive
-   emotionally meaningful

It should NOT feel:

-   like an AI-generated template
-   like a school project
-   like a generic birthday card
-   overly childish
-   overloaded with animations
-   overloaded with developer jokes

The best reaction I want is:

> "You actually built all of this for me?"

followed by:

> "This is beautiful."

------------------------------------------------------------------------

# 30. Cursor Implementation Instructions

You are Cursor working on this project.

Before writing large amounts of code:

1.  Analyze the complete requirements.
2.  Propose the final information architecture.
3.  Identify any contradictions or missing content.
4.  Create a practical implementation plan.
5.  Then implement the experience incrementally.

Do not stop at a static mockup.

Build a functioning full-fledged application.

Start with the complete shell and interaction system, then integrate
content/media placeholders.

After implementation: - run lint - run type checks - run production
build - fix errors - inspect responsive behavior - ensure no broken
media references - ensure all transitions work - ensure the unlock state
works after refresh/navigation - ensure reduced motion works

------------------------------------------------------------------------

# 31. Important Product Principle

Do not optimize for "how many features can we add."

Optimize for:

**"How memorable does this feel to one person?"**

A smaller number of extremely polished experiences is better than 20
mediocre features.

The 30-click unlock, glitter/particles, childhood photos, present-day
photos, video-call moments, personal letter, and final video are the
core building blocks.

Everything else should support those.

------------------------------------------------------------------------

# 32. Suggested Experience Summary

The current desired experience is approximately:

``` text
┌───────────────────────────────┐
│                               │
│       SOMETHING FOR YOU       │
│                               │
│       [ TAP TO UNLOCK ]       │
│             0/30              │
│                               │
└───────────────┬───────────────┘
                │
                ▼
        ✨ UNLOCK ANIMATION ✨
                │
                ▼
        BIRTHDAY EXPERIENCE
                │
                ▼
       "THIS IS YOUR STORY"
                │
                ▼
          CHILDHOOD
       2–3 photographs
                │
                ▼
             NOW
       Recent photographs
                │
                ▼
        HER TECH / HER WORLD
                │
                ▼
        THINGS I ADMIRE
                │
                ▼
       REAL VIDEO MOMENTS
      Video-call recordings
                │
                ▼
          NEXT CHAPTER
       subtle 2026 / future
                │
                ▼
        "ONE LAST THING"
                │
                ▼
       PERSONAL LETTER
                │
                ▼
        PERSONAL VIDEO
                │
                ▼
          FINAL REVEAL
                │
                ▼
       HAPPY BIRTHDAY ❤️
```

This is a starting point, not a rigid specification.

Use your product/design judgment to improve the flow while respecting
the constraints above.

------------------------------------------------------------------------

# 33. Final Acceptance Criteria

The project is complete only when:

-   [ ] The website is fully functional.
-   [ ] The initial 30-tap unlock interaction works.
-   [ ] Unlock progress is visually satisfying.
-   [ ] Glitter/particle effect is implemented and reusable.
-   [ ] Childhood images have a dedicated cinematic presentation.
-   [ ] Recent images have a dedicated presentation.
-   [ ] No couple-photo collage is required.
-   [ ] Video-call recordings can be embedded.
-   [ ] Final personal video can be embedded.
-   [ ] Personal written message has a dedicated emotional presentation.
-   [ ] Developer/tech references are tasteful.
-   [ ] No mini-games are used.
-   [ ] No personality engine is used.
-   [ ] The site does not feel like the Valentine's Day website
    repeated.
-   [ ] Wedding date context can be represented subtly without making it
    a wedding website.
-   [ ] Mobile experience is excellent.
-   [ ] Desktop experience is excellent.
-   [ ] Reduced-motion support exists.
-   [ ] Media is lazy-loaded where appropriate.
-   [ ] Production build succeeds.
-   [ ] No console errors in normal usage.
-   [ ] Content can be changed from a centralized configuration/data
    layer.
-   [ ] README explains how to customize and deploy the project.
-   [ ] The final experience feels like a bespoke product built
    specifically for her.

------------------------------------------------------------------------

# 34. Content I Will Provide Later

Do not block development waiting for all of these.

Use placeholders and make the system ready for:

-   Her name
-   Her age
-   Childhood photos
-   Childhood photo captions
-   Recent photos
-   Recent photo captions
-   Tech/career facts if desired
-   Things I admire about her
-   Video-call recordings
-   Final written birthday message
-   Final personal birthday video
-   Optional background music
-   My name
-   Any final inside references

Build the application so these can be plugged in later without
restructuring the application.

------------------------------------------------------------------------

# 35. One Last Design Direction

This is not a website I want her to "browse."

I want it to feel like an **experience she discovers**.

The beginning should make her curious.

The middle should make her smile.

The childhood/present sections should make her pause.

The real video moments should make it feel authentic.

The letter should make it personal.

The final video should make it human.

And when everything ends, she should understand one thing:

**This entire thing exists because someone thought she was worth
building something for.**
