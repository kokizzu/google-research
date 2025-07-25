// Copyright 2025 The Google Research Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * This is the main MQM template. Other MQM template variants are derived
 * from this by overriding severitities/errors and changing configuration
 * constants.
 */
antheaTemplates['MQM-Quality-Score'] = {
  severities: {
    major: {
      display: 'Major severity',
      shortcut: 'M',
      color: 'pink',
      description: 'Major severity errors significantly alter the meaning ' +
                   'of the source text, or significantly degrade the quality ' +
                   'of the text.',
    },
    minor: {
      display: 'Minor severity',
      shortcut: 'm',
      color: '#fbec5d',
      description: 'Minor severity errors are noticeable but minor flaws in the ' +
                   'translated text. They do not significantly alter the ' +
                   'meaning of the source text, and they do not ' +
                   'significantly degrade the quality of the text.',
    },
  },

  /**
   * @const {string} Template version identifier.
   */
  VERSION: 'v1.00-Mar-24-2025',

  /**
   * @const {boolean} Show two translations when set to true.
   */
  SIDE_BY_SIDE: false,

  /**
   * @const {boolean} Collect per-segment quality scores when set to true. Also
   *    disables splitting segments into sub-paragraphs.
   */
  COLLECT_QUALITY_SCORE: true,

  /**
   * @const {boolean} Only rate the target side, i.e., the translated text.
   */
  TARGET_SIDE_ONLY: false,

  /**
   * @const {number} Allow marking at most these many errors per sentence. If
   *     set to 0, then no limit is imposed.
   */
  MAX_ERRORS: 0,

  /**
   * @const {boolean} Set this to true if the template instructions already
   *     include listings of errors and severities, and you do not want to
   *     auto-append the lists of errors/severities to the instructions.
   */
  SKIP_RATINGS_TABLES: true,

  /**
   * @const {boolean} Set this to true if you want to allow error spans to
   *     start on whitespace.
   */
  ALLOW_SPANS_STARTING_ON_SPACE: true,

  /**
   * @const {boolean} Set this to true if you want to present the error
   *    types/subtypes in a short, flat list (avoid using this if you have
   *    more than 10 error type/subtype combinatons).
   */
  FLATTEN_SUBTYPES: false,

  /**
   * @const {boolean} Set this to true if your TSV data for each docsys
   *     includes a web page rendering and bounding box provided as an
   *     annotation on each first segment. The annotation should be a JSON
   *     string that looks like this (exccept that it should not have
   *     newlines):
   * {
   *   "source": {
   *     "url": "http://screenshot-image-url-for-source",
   *     "w": 100, "h": 120, "box": {"x": 5, "y": 7, "w": 90, "h": 30}
   *   },"
   *   "target": {
   *     "url": "http://screenshot-image-url-for-target",
   *     "w": 100, "h": 120, " "box": {"x": 5, "y": 7, "w": 90, "h": 30}
   *   },
   * }
   */
  USE_PAGE_CONTEXT: false,

  errors: {
    accuracy: {
      display: 'Accuracy',
      description: 'The target text does not accurately reflect the source text.',
      subtypes: {
        reinterpretation: {
          display: 'Creative Reinterpretation',
          description: 'The target text reinterprets the source, but preserves its intent within its broader context (the document and its purpose, and the target locale). This can be because the translation adds, removes, or modifies text in accordance with the target locale, or simply makes creative changes that fully preserve the intent of the source text.',
        },
        mistranslation: {
          display: 'Mistranslation',
          description: 'The target text does not accurately represent the source text.',
        },
        gender_mismatch: {
          display: 'Gender Mismatch',
          description: 'The gender is incorrect (incorrect pronouns, noun/adjective endings, etc).',
        },
        untranslated: {
          display: 'Source language fragment',
          description: 'Content that should have been translated has been left untranslated.',
        },
        addition: {
          display: 'Addition',
          description: 'The target text includes information not present in the source.',
        },
        omission: {
          display: 'Omission',
          description: 'Content is missing from the translation that is present in the source.',
          source_side_only: true,
        },
      },
    },
    fluency: {
      display: 'Fluency',
      description: 'Issues related to the form or content of translated text, independent of its relation to the source text; errors in the translated text that prevent it from being understood clearly.',
      subtypes: {
        inconsistency: {
          display: 'Inconsistency',
          description: 'The text shows internal inconsistency (not related to terminology).',
        },
        grammar: {
          display: 'Grammar',
          description: 'Issues related to the grammar or syntax of the text, other than spelling and orthography.',
        },
        register: {
          display: 'Register',
          description: 'The content uses the wrong grammatical register, such as using informal pronouns or verb forms when their formal counterparts are required.',
        },
        spelling: {
          display: 'Spelling',
          description: 'Issues related to spelling or capitalization of words, and incorrect omission/addition of whitespace.',
        },
        breaking: {
          display: 'Text-Breaking',
          description: 'Issues related to missing or unwarranted paragraph breaks or line breaks.',
        },
        punctuation: {
          display: 'Punctuation',
          description: 'Punctuation is used incorrectly (for the locale or style).',
        },
        display: {
          display: 'Character encoding',
          description: 'Characters are garbled due to incorrect application of an encoding.',
        },
      },
    },
    style: {
      display: 'Style',
      description: 'The text has stylistic problems.',
      subtypes: {
        awkward: {
          display: 'Unnatural or awkward',
          description: 'The text is literal, written in an awkward style, unidiomatic or inappropriate in the context.',
        },
        sentence_structure: {
          display: 'Bad sentence structure',
          description: 'The marked span of text is an unnecessary repetition, or makes the sentence unnecessarily long, or would have been better as a clause in the previous sentence.'
        },
        archaic_word: {
          display: 'Archaic or obscure word choice',
          description: 'An archaic or lesser-known word is used where a more colloquial term would be a better fit.',
        },
      },
    },
    terminology: {
      display: 'Terminology',
      description: 'A term (domain-specific word) is translated with a term other than the one expected for the domain implied by the context.',
      subtypes: {
        inappropriate: {
          display: 'Inappropriate for context',
          description: 'Translation does not adhere to appropriate industry standard terminology or contains terminology that does not fit the context.',
        },
        inconsistent: {
          display: 'Inconsistent',
          description: 'Terminology is used in an inconsistent manner within the text.',
        },
      },
    },
    locale_convention: {
      display: 'Locale convention',
      description: 'The text does not adhere to locale-specific mechanical conventions and violates requirements for the presentation of content in the target locale.',
      subtypes: {
        address: {
          display: 'Address format',
          description: 'Content uses the wrong format for addresses.',
        },
        date: {
          display: 'Date format',
          description: 'A text uses a date format inappropriate for its locale.',
        },
        currency: {
          display: 'Currency format',
          description: 'Content uses the wrong format for currency.',
        },
        telephone: {
          display: 'Telephone format',
          description: 'Content uses the wrong form for telephone numbers.',
        },
        time: {
          display: 'Time format',
          description: 'Content uses the wrong form for time.',
        },
        name: {
          display: 'Name format',
          description: 'Content uses the wrong form for name.',
        },
      },
    },
    other: {
      display: 'Other',
      description: 'Any other issues (please provide a short description when prompted).',
      needs_note: true,
      source_side_ok: true,
    },
    non_translation: {
      display: 'Non-translation!',
      description: 'The whole sentence is completely not a translation of the source. This rare category, when used, overrides any other marked errors for that sentence, and labels the full translated sentence as the error span. Only available after choosing a major error.',
      forced_severity: 'major',
      override_all_errors: true,
    },
    source_error: {
      display: 'Source issue',
      description: 'Any issue in the source.',
      source_side_only: true,
    },
  },

  /**
   * Instructions are built using default section order and contents in
   * template-base.js.
   */
  instructions_section_contents: {
    'Overview': `
      <h2>Overview</h2>
      <p>
        In this project, you will be shown translations of different documents
        that you will review and annotate for errors and issues. You will
        annotate by selecting spans of words affected by errors, then labeling
        them with severities and issue types. You will also provide an overall
        quality score for each segment. The goal of this project is to
        evaluate the quality of various human and machine translation outputs.
      </p>
      <p>
        The content for annotation consists of documents that are broken down
        into parallel segments. A segment may be one sentence, multiple
        sentences, an entire paragraph, or an entire document. Navigation 
        through the document is explained in detail in the "Navigation"
        subsection.
      </p>
      `,
  'Navigation': `
      <h2>Navigation</h2>
      <p>
        Each task consists of text from a single document alongside its
        translation. Sometimes it can be a very short document (even a single
        sentence), but typically a document will have 10-20 sentences.
      </p>
      <ul>
        <li>
        You will go through a document segment by segment. The right arrow
        key/button will take you from a source segment to the translation of
        that segment, and from the translation to the source side of the next
        segment if the document was translated as multiple segments.
        </li>
        <li>
        If a source segment appears to be too long, you can (at any time) choose
        to jump to the translation side after reading some part of the source,
        using the Tab key. The Tab key will similarly allow you to jump back to
        the source side from the translation side. We leave the judgment to you,
        as to how to divide your annotation process for long segments into
        smaller units.
        </li>
        <li>
        You can also use the left arrow key/button to go <i>back</i> through the
        segments. You can also directly click on any previously read part of the
        text to jump back to it.
        </li>
      </ul>
      `,
    'Annotation Process': `
    <h2>Annotation Process</h2>
    <ol>
      <li>Review the translation of each segment against the source, following
          the general guidelines above.</li>
      <li>
        Select the <b>span</b> of words affected by the issue by clicking on
        the word/particle where the identified issue “begins”, then clicking
        on the word/particle where the issue “ends”. If it is only one word,
        then you have to click on it twice.
        <ul>
          <li>The marked span should be the minimal contiguous sequence such
              that modifying the word(s) within the span, deleting the span,
              or moving the word(s) somewhere else in the sentence will remove
              the identified issue. The span should not include adjoining
              words that are not directly affected by the identified issue and
              do not need to be modified in order for the issue to be
              fixed.</li>
          <li>You can only mark spans within sentences. In the rare case that
              an error straddles multiple sentences (e.g., when there is an
              incorrect sentence break), just mark the first part of the span
              that lies within a sentence.</li>
          <li>The shorter the span, the more useful it is.</li>
          <li>When it comes to "Style/Unnatural or awkward" errors, please
              pinpoint the error rather than extend the span to an entire
              clause.</li>
          <li>If a single issue affects words that do not directly follow each
              other, as is the case with split verbs in German
              (“teilte die Feuerwehr auf”) or phrasal verbs in English
              (“called Mary and her brother up”), log the issue only for the
              first part (“teilte”, “called”) and do not log anything for the
              latter part (“auf”, “up”). The text between “teilte” and “auf”,
              or between “called” and “up”, should not be included in the span
              if the issue is with the verb only (“aufteilen”, “call up”).
          </li>
          <li>Note: issues can appear either on the translation side, or
              rarely, for the "Source issue" type, on the source side. When
              the error is an omission, the error span must be selected on the
              source side.</li>
        </ul>
      </li>
      <li>
        Select the <b>severity</b> of the issue using the buttons in the
        rightmost column ("Evaluations") or their keyboard shortcuts:
        <ul>
          <li>Major severity (M)</li>
          <li>Minor severity (m)</li>
        </ul>
      </li>
      <li>Select the <b>category</b> (also called <b>type</b>) and
          <b>subcategory</b> (also called <b>subtype</b>) of the error/issue
          found. For example: Accuracy &gt; Mistranslation.</li>
      <li>After annotating all identified issues in a segment, use the
        Quality Score slider to rate the overall quality of the translation of
        that segment.</li>
      <li>After selecting the quality score, use the
          <b>right arrow key</b> (or the <b>button</b>) to go to the next
          segment.</li>
    </ol>`,
  'Annotation Tips': `
      <details>
        <summary>
          <span class="summary-heading">Annotation Tips</span>
        </summary>
        <ol>
          <li>
            You can modify or delete any rating in the current segment
            by using the menu shown to the right of the rating. The menu is
            revealed when you hover your mouse over the hamburger icon
            (&#9776;). If deleted, the rating is shown with a strikethrough
            line. You can undelete a deleted rating using the menu, if desired.
          </li>
          <li>
            While editing a rating, its text will be shown with a
            <span style="text-decoration: red wavy underline">red wavy
            underline</span>. You can use the "Cancel" button or the Escape key
            to abort an ongoing modification to a rating.
          </li>
          <li>
            To modify or delete a rating for a previous sentence in the
            current document, you can first click on it to navigate to it (or
            use the arrow key/button) and then use the hamburger menu.
          </li>
          <li>
            Sometimes, you might be re-evaluating a document that was already
            evaluated previously. In such cases, you will see the previous
            annotations and can simply keep them, edit them, delete them, or
            supplement them with additional annotations.
          </li>
          <li>
            Occasionally, the translated sentence will be altered to
            include an artificially injected error. Evaluating translation
            quality is a difficult and demanding task, and such "test sentences"
            are used to help you maintain the high level of attention the task
            needs. Once you have marked any error in a test sentence, its
            unaltered version will be shown. If you miss marking any error in a
            test sentence, you will be shown a cautionary reminder about that.
            In either case, once the unaltered version is revealed, you have to
            proceed to rate its quality just like all the other sentences.
          </li>
        </ol>
      </details>`,
  'Quality Score Guidelines': `
      <h2> Quality Score Guidelines</h2>
      <p>
        The quality score is a measure of the overall quality of the translation
        of the segment. It is a number between 0 and 100, where 0 is the worst
        quality and 100 is the best quality. It is a holistic measure of
        quality, including both accuracy (meaning preservation) and fluency
        (naturalness in the target locale).
      </p>
      <p>
        The specific quality score you choose is up to your best judgment.
        However, below are some "landmark" scores to help guide your selection:
      </p>
      <ul>
        <li>
          <b>0 (No meaning preserved)</b>: Nearly all information is lost in the
            translation.
        </li>
        <li>
          <b>33 (Some meaning preserved)</b>: Some of the meaning is preserved
            but significant parts are missing. The narrative is hard to follow
            due to errors. Grammar may be poor.
        </li>
        <li>
          <b>66 (Most meaning preserved and few grammar mistakes)</b>: The
            translation retains most of the meaning. It may have some grammar
            mistakes or minor inconsistencies.
        </li>
        <li>
          <b>100 (Perfect meaning and grammar)</b>: The meaning and grammar of
            the translation is completely consistent with the source.
        </li>
      </ul>`,
  },
  instructions_section_order: [
    '_style', 'Overview', 'General Guidelines', 'Navigation',
    'Annotation Process', 'Annotation Tips', 'Quality Score Guidelines',
    'Severities defined', 'Error Types and Subtypes defined',
    'Annotations exemplified in detail', 'Style &amp; Convention Guidelines',
    'Feedback'
  ],
};
