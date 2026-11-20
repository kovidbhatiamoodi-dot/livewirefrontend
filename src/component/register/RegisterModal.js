import React, { useEffect, useRef, useState } from "react";
import "./RegisterModal.css";

// Same file is used by the Livewire and Soulstrings sites - keep them in sync.
export const API_URL = (process.env.REACT_APP_API_URL || "https://livewirebackend.moodi.org").replace(/\/$/, "");

const EVENTS = {
  livewire: {
    title: "LIVEWIRE",
    band: true,
    videoLimit: 10,
    rules: [
      "The band should submit and perform only their original compositions.",
      "The entire sound should be produced live; use of pre-recorded samples must be approved by the organizers.",
      "There are no language and genre restrictions on the bands.",
      "Online round: the performance video must not be longer than 10 minutes.",
    ],
  },
  soulstrings: {
    title: "SOULSTRINGS",
    band: false,
    videoLimit: 5,
    rules: [
      "Individuals must submit and perform their own original compositions.",
      "The entire sound should be produced live; pre-recorded samples require prior approval from the organizers.",
      "The individuals should not be college students.",
      "Advance notification to the organizers is mandatory for the use of any instrument.",
      "There are no language and genre restrictions.",
      "Online round: the performance video must not be longer than 5 minutes.",
    ],
  },
};

const ROUNDS = [
  {
    key: "mumbai_offline",
    title: "Mumbai Elimination",
    tag: "Offline · 5th December",
  },
  {
    key: "online",
    title: "Online Elimination",
    tag: "Submissions till 5th December",
  },
];

const EMPTY = {
  actName: "",
  contactName: "",
  email: "",
  phone: "",
  backupPhone: "",
  city: "",
  genre: "",
  memberCount: "",
  memberNames: "",
  instruments: "",
  musicLinks: "",
  pastAchievements: "",
  songTitle: "",
  submissionLink: "",
  rulesAccepted: false,
};

const Field = ({ label, name, error, required, hint, children }) => (
  <label className={`rm-field ${error ? "rm-has-error" : ""}`} htmlFor={`rm-${name}`}>
    <span className="rm-label">
      {label}
      {required && <span className="rm-req"> *</span>}
    </span>
    {children}
    {hint && !error && <span className="rm-hint">{hint}</span>}
    {error && <span className="rm-error">{error}</span>}
  </label>
);

export default function RegisterModal({ event, open, initialRound = "online", onClose }) {
  const ev = EVENTS[event];
  const [round, setRound] = useState(initialRound);
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | done
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [roundInfo, setRoundInfo] = useState(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (open) setRound(initialRound);
  }, [open, initialRound]);

  // Which rounds are still open (deadlines live on the server).
  useEffect(() => {
    if (!open || roundInfo) return;
    fetch(`${API_URL}/api/config`)
      .then((r) => (r.ok ? r.json() : null))
      .then((cfg) => cfg && setRoundInfo(cfg.rounds))
      .catch(() => {});
  }, [open, roundInfo]);

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && status !== "sending" && onClose();
    window.addEventListener("keydown", onKey);
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, status]);

  if (!open || !ev) return null;

  const isOnline = round === "online";
  const closed = roundInfo?.[round] && roundInfo[round].open === false;

  const set = (name) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const checkLocally = () => {
    const er = {};
    const phoneOk = (p) => /^[6-9]\d{9}$/.test(p.replace(/\D/g, "").replace(/^(91|0)(?=\d{10}$)/, ""));
    if (form.actName.trim().length < 2) er.actName = "Required";
    if (form.contactName.trim().length < 2) er.contactName = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) er.email = "Enter a valid email";
    if (!phoneOk(form.phone)) er.phone = "Enter a valid 10-digit mobile number";
    if (form.backupPhone && !phoneOk(form.backupPhone)) er.backupPhone = "Enter a valid 10-digit mobile number";
    if (form.city.trim().length < 2) er.city = "Required";
    if (ev.band) {
      const n = Number(form.memberCount);
      if (!Number.isInteger(n) || n < 2 || n > 15) er.memberCount = "Between 2 and 15";
    }
    if (isOnline && !/^https:\/\/(drive|docs)\.google\.com\/\S+$/i.test(form.submissionLink.trim()))
      er.submissionLink = "Paste a Google Drive link (https://drive.google.com/...)";
    if (!form.rulesAccepted) er.rulesAccepted = "Please accept the rules";
    return er;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    setMessage("");
    const er = checkLocally();
    setErrors(er);
    if (Object.keys(er).length) {
      setMessage("Please fix the highlighted fields.");
      return;
    }
    setStatus("sending");
    try {
      const body = { ...form, event, round, memberCount: ev.band ? Number(form.memberCount) : undefined };
      const res = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json().catch(() => ({}));
      if (res.status === 201) {
        setResult(json);
        setStatus("done");
        return;
      }
      if (json.errors) setErrors(json.errors);
      setMessage(json.message || "Something went wrong. Please try again.");
      setStatus("idle");
    } catch {
      setMessage("Could not reach the server. Check your connection and try again.");
      setStatus("idle");
    }
  };

  const close = () => {
    if (status === "sending") return;
    if (status === "done") {
      setForm(EMPTY);
      setResult(null);
      setStatus("idle");
    }
    setErrors({});
    setMessage("");
    onClose();
  };

  return (
    <div className={`rm-overlay rm-theme-${event}`} role="presentation">
      <div
        className="rm-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rm-title"
        tabIndex={-1}
        ref={dialogRef}
      >
        <button type="button" className="rm-close" onClick={close} aria-label="Close">
          ×
        </button>

        <p className="rm-kicker">Mood Indigo 2026</p>
        <h2 id="rm-title" className="rm-title">
          Register for {ev.title}
        </h2>

        {status === "done" && result ? (
          <div className="rm-success">
            <p className="rm-success-head">You're registered!</p>
            <p>{result.round}</p>
            <p className="rm-regid-label">Your registration ID</p>
            <p className="rm-regid">{result.regId}</p>
            <p className="rm-small">
              Save this ID. The team will contact you on the phone number and email you entered.
            </p>
            <button type="button" className="rm-submit" onClick={close}>
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <div className="rm-rounds" role="tablist" aria-label="Choose round">
              {ROUNDS.map((r) => (
                <button
                  key={r.key}
                  type="button"
                  role="tab"
                  aria-selected={round === r.key}
                  className={`rm-round ${round === r.key ? "rm-round-active" : ""}`}
                  onClick={() => {
                    setRound(r.key);
                    setMessage("");
                  }}
                >
                  <span className="rm-round-title">{r.title}</span>
                  <span className="rm-round-tag">{r.tag}</span>
                </button>
              ))}
            </div>

            <div className="rm-note">
              {isOnline ? (
                <>
                  Upload your performance video to <b>Google Drive</b>, set sharing to{" "}
                  <b>"Anyone with the link"</b> and paste the link below. Video length: <b>max {ev.videoLimit} minutes</b>.
                  Submissions close on <b>5th December</b>.
                </>
              ) : (
                <>
                  Register to perform live at the <b>Mumbai elimination round</b> on <b>5th December</b>. Venue and
                  reporting time will be shared on your phone / email.
                </>
              )}
            </div>

            {closed ? (
              <p className="rm-closed">Registrations for this round are closed.</p>
            ) : (
              <>
                <div className="rm-grid">
                  <Field label={ev.band ? "Band name" : "Artist / stage name"} name="actName" error={errors.actName} required>
                    <input id="rm-actName" value={form.actName} onChange={set("actName")} maxLength={120} />
                  </Field>
                  <Field label={ev.band ? "Band leader's name" : "Full name"} name="contactName" error={errors.contactName} required>
                    <input id="rm-contactName" value={form.contactName} onChange={set("contactName")} maxLength={120} autoComplete="name" />
                  </Field>
                  <Field label="Email" name="email" error={errors.email} required>
                    <input id="rm-email" type="email" value={form.email} onChange={set("email")} maxLength={160} autoComplete="email" />
                  </Field>
                  <Field label="Phone (WhatsApp)" name="phone" error={errors.phone} required>
                    <input id="rm-phone" type="tel" inputMode="numeric" value={form.phone} onChange={set("phone")} maxLength={16} autoComplete="tel" placeholder="10-digit mobile" />
                  </Field>
                  <Field label="Backup phone" name="backupPhone" error={errors.backupPhone}>
                    <input id="rm-backupPhone" type="tel" inputMode="numeric" value={form.backupPhone} onChange={set("backupPhone")} maxLength={16} />
                  </Field>
                  <Field label="City" name="city" error={errors.city} required>
                    <input id="rm-city" value={form.city} onChange={set("city")} maxLength={80} autoComplete="address-level2" />
                  </Field>
                  <Field label="Genre" name="genre" error={errors.genre}>
                    <input id="rm-genre" value={form.genre} onChange={set("genre")} maxLength={80} />
                  </Field>
                  {ev.band ? (
                    <Field label="Number of members" name="memberCount" error={errors.memberCount} required>
                      <input id="rm-memberCount" type="number" min={2} max={15} value={form.memberCount} onChange={set("memberCount")} />
                    </Field>
                  ) : (
                    <Field label="Instrument(s) you play" name="instruments" error={errors.instruments}>
                      <input id="rm-instruments" value={form.instruments} onChange={set("instruments")} maxLength={200} placeholder="e.g. Guitar, Vocals" />
                    </Field>
                  )}
                </div>

                {ev.band && (
                  <Field label="Member names & instruments" name="memberNames" error={errors.memberNames}>
                    <textarea id="rm-memberNames" rows={2} value={form.memberNames} onChange={set("memberNames")} maxLength={1000} />
                  </Field>
                )}

                {isOnline && (
                  <div className="rm-grid">
                    <Field label="Song title" name="songTitle" error={errors.songTitle}>
                      <input id="rm-songTitle" value={form.songTitle} onChange={set("songTitle")} maxLength={160} />
                    </Field>
                    <Field
                      label={`Video link (Google Drive, max ${ev.videoLimit} min)`}
                      name="submissionLink"
                      error={errors.submissionLink}
                      required
                    >
                      <input id="rm-submissionLink" type="url" value={form.submissionLink} onChange={set("submissionLink")} maxLength={600} placeholder="https://drive.google.com/..." />
                    </Field>
                  </div>
                )}

                <Field
                  label="Links to your original music (singles / albums)"
                  name="musicLinks"
                  error={errors.musicLinks}
                  hint="Separate multiple links with commas"
                >
                  <textarea id="rm-musicLinks" rows={2} value={form.musicLinks} onChange={set("musicLinks")} maxLength={1500} />
                </Field>
                <Field label="Past achievements" name="pastAchievements" error={errors.pastAchievements}>
                  <textarea id="rm-pastAchievements" rows={2} value={form.pastAchievements} onChange={set("pastAchievements")} maxLength={1500} />
                </Field>

                <details className="rm-rules">
                  <summary>Rules</summary>
                  <ul>
                    {ev.rules.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </details>

                <label className={`rm-check ${errors.rulesAccepted ? "rm-has-error" : ""}`}>
                  <input type="checkbox" checked={form.rulesAccepted} onChange={set("rulesAccepted")} />
                  <span>
                    I have read the rules{isOnline ? ` and my video is not longer than ${ev.videoLimit} minutes` : ""}.
                  </span>
                </label>

                {message && <p className="rm-message" role="alert">{message}</p>}

                <button type="submit" className="rm-submit" disabled={status === "sending"}>
                  {status === "sending" ? "Submitting…" : isOnline ? "Submit entry" : "Register"}
                </button>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
