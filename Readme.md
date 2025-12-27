## Double Machine Learning Workshop Example

Double Machine Learning (DML) uses modern machine learning models to control for
large sets of confounding variables when estimating causal effects. By splitting
the data and cross-fitting the models, DML delivers unbiased estimates and valid
confidence intervals even when using flexible learners. This methodology is
popular in economics and Ads Measurement to quantify the incremental impact of
showing ads to users with many observed features.

`double_ml_example.py` provides a short demonstration of Double Machine
Learning. Run the script with:

```bash
python double_ml_example.py
```

It simulates data and estimates the average treatment effect of a treatment on
an outcome using random forests for the nuisance functions.


## Ads Tactic Effectiveness Example

`double_ml_ads_example.py` mimics user-level ad measurement. It estimates the
lift from a targeted ad tactic while controlling for age, prior engagement, and
device type.

Run the script with:

```bash
python double_ml_ads_example.py
```

## Blog theme customization

The Jekyll site now uses a custom minimal theme with light/dark mode. To tweak
branding:

- **Name & tagline:** edit `title` and `description` in `_config.yml`.
- **Accent color or fonts:** adjust the variables at the top of
  `assets/main.scss`.
- **Social links:** update the hero links in `_layouts/home.html` and the list in
  `about.md`.
- **Navigation:** links live in `_includes/header.html`.
- **Posts:** add new Markdown files to `_posts/` using the `YYYY-MM-DD-title.md`
  convention; they will show on the home and Posts pages automatically.

## Local development & builds

Install dependencies and build the site locally with Bundler:

```bash
bundle install
bundle exec jekyll build
```

If you prefer a live-reloading preview, run `bundle exec jekyll serve --livereload`
and open the reported localhost URL in your browser.

