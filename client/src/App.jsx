
import { useState, useEffect } from "react";
import api from "./api/axios";
import {
  BookOpen,
  Search,
  Upload,
  Download,
  GraduationCap,
  FileText,
  Menu,
  X
} from "lucide-react";
import "./index.css";

const sampleNotes = [
  {
    id: 1,
    title: "Data Structures and Algorithms",
    subject: "Computer Science",
    semester: "Semester 3",
    type: "Lecture Notes",
    pages: 24,
    color: "purple"
  },
  {
    id: 2,
    title: "Artificial Intelligence Fundamentals",
    subject: "Artificial Intelligence",
    semester: "Semester 5",
    type: "Study Guide",
    pages: 18,
    color: "blue"
  },
  {
    id: 3,
    title: "Database Management Systems",
    subject: "Computer Science",
    semester: "Semester 4",
    type: "Exam Preparation",
    pages: 32,
    color: "pink"
  },
  {
    id: 4,
    title: "Computer Networks",
    subject: "Information Technology",
    semester: "Semester 4",
    type: "Lecture Notes",
    pages: 20,
    color: "orange"
  },
  {
    id: 5,
    title: "Machine Learning Basics",
    subject: "Artificial Intelligence",
    semester: "Semester 6",
    type: "Study Guide",
    pages: 27,
    color: "green"
  },
  {
    id: 6,
    title: "Operating Systems",
    subject: "Computer Science",
    semester: "Semester 3",
    type: "Exam Preparation",
    pages: 22,
    color: "blue"
  }
];

const categories = [
  "All Subjects",
  "Computer Science",
  "Artificial Intelligence",
  "Information Technology"
];

export default function App() {
  useEffect(() => {
    api.get("/api/health")
      .then((response) => {
        console.log("Backend connected:", response.data.message);
      })
      .catch((error) => {
        console.error("Backend connection failed:", error.message);
      });
  }, []);

  
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Subjects");
  const [menuOpen, setMenuOpen] = useState(false);
  const [message, setMessage] = useState("");

  const filteredNotes = sampleNotes.filter((note) => {
    const matchesSearch =
      `${note.title} ${note.subject} ${note.type}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      category === "All Subjects" || note.subject === category;

    return matchesSearch && matchesCategory;
  });

  function handleUpload() {
    setMessage(
      "PDF uploading will be enabled when we build the backend."
    );
  }

  function handleDownload(note) {
    setMessage(
      `"${note.title}" is a sample card. PDF downloads will be enabled in a later step.`
    );
  }

  return (
    <div className="app">
      <header className="navbar">
        <a className="brand" href="#home">
          <span className="brand-icon">
            <BookOpen size={23} />
          </span>
          <span>Note<span className="brand-highlight">Nest</span></span>
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#notes" onClick={() => setMenuOpen(false)}>Explore Notes</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <button className="nav-upload" onClick={handleUpload}>
            <Upload size={17} /> Share Notes
          </button>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-glow glow-one" />
          <div className="hero-glow glow-two" />

          <div className="hero-content">
            <div className="eyebrow">
              <GraduationCap size={17} />
              YOUR LEARNING COMMUNITY
            </div>

            <h1>
              Great notes.
              <br />
              <span>Greater futures.</span>
            </h1>

            <p>
              Discover study materials, share your knowledge,
              and make learning easier with a community that
              grows together.
            </p>

            <div className="hero-actions">
              <a href="#notes" className="primary-button">
                Explore Notes <span>→</span>
              </a>
              <button className="secondary-button" onClick={handleUpload}>
                <Upload size={18} /> Share your notes
              </button>
            </div>

            <div className="hero-trust">
              <div className="trust-icon"><BookOpen size={18} /></div>
              <span>Learn together. Succeed together.</span>
            </div>
          </div>

          <div className="hero-illustration">
            <div className="floating-tag tag-top">
              <span className="tag-dot" />
              Learning made simple
            </div>

            <div className="hero-book">
              <div className="book-top">
                <BookOpen size={35} />
                <span>YOUR NEXT CHAPTER</span>
              </div>
              <div className="book-lines">
                <i />
                <i />
                <i />
                <i />
              </div>
              <div className="book-bottom">
                <span>KNOWLEDGE</span>
                <GraduationCap size={27} />
              </div>
            </div>

            <div className="floating-tag tag-bottom">
              <span className="mini-check">✓</span>
              Keep growing
            </div>
            <span className="decor decor-one">✦</span>
            <span className="decor decor-two">✧</span>
          </div>
        </section>

        <section className="stats">
          <div className="stat-item">
            <span className="stat-icon lavender"><BookOpen size={21} /></span>
            <div><strong>Study smarter</strong><span>Organized study materials</span></div>
          </div>
          <div className="stat-item">
            <span className="stat-icon peach"><GraduationCap size={21} /></span>
            <div><strong>Learn together</strong><span>Student-powered knowledge</span></div>
          </div>
          <div className="stat-item">
            <span className="stat-icon mint"><FileText size={21} /></span>
            <div><strong>Find your focus</strong><span>Notes for your subjects</span></div>
          </div>
        </section>

        <section className="notes-section" id="notes">
          <div className="section-heading">
            <div>
              <span className="section-kicker">YOUR STUDY SPACE</span>
              <h2>Explore study notes<span>.</span></h2>
              <p>Find helpful materials for your next learning session.</p>
            </div>
            <button className="outline-button" onClick={handleUpload}>
              <Upload size={17} /> Share Notes
            </button>
          </div>

          <div className="search-panel">
            <div className="search-box">
              <Search size={21} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by note title or subject..."
                aria-label="Search notes"
              />
              {search && (
                <button
                  className="clear-search"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  <X size={17} />
                </button>
              )}
            </div>

            <div className="category-filters">
              {categories.map((item) => (
                <button
                  key={item}
                  className={category === item ? "filter active" : "filter"}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="notes-count">
            <span>{filteredNotes.length} study resources</span>
            <span>Sample materials</span>
          </div>

          <div className="notes-grid">
            {filteredNotes.map((note) => (
              <article className="note-card" key={note.id}>
                <div className={`note-cover ${note.color}`}>
                  <div className="cover-label">{note.type}</div>
                  <div className="cover-symbol"><BookOpen size={33} /></div>
                  <span className="cover-pages">{note.pages} pages</span>
                </div>

                <div className="note-body">
                  <span className="note-subject">{note.subject}</span>
                  <h3>{note.title}</h3>
                  <div className="note-meta">
                    <span><GraduationCap size={15} /> {note.semester}</span>
                    <span><FileText size={15} /> PDF resource</span>
                  </div>
                  <button
                    className="download-button"
                    onClick={() => handleDownload(note)}
                  >
                    <Download size={17} /> Download notes
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredNotes.length === 0 && (
            <div className="empty-state">
              <Search size={35} />
              <h3>No notes found</h3>
              <p>Try another keyword or choose a different subject.</p>
              <button
                className="primary-button"
                onClick={() => {
                  setSearch("");
                  setCategory("All Subjects");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        <section className="community" id="about">
          <div className="community-icon"><GraduationCap size={34} /></div>
          <div>
            <span className="section-kicker">GROW AS A COMMUNITY</span>
            <h2>Your notes can help someone succeed.</h2>
            <p>Share what you know. Discover what you need. Keep learning.</p>
          </div>
          <button className="community-button" onClick={handleUpload}>
            Share Notes <span>→</span>
          </button>
        </section>
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-icon"><BookOpen size={21} /></span>
          <span>Note<span className="brand-highlight">Nest</span></span>
        </a>
        <p>Made for students, built for learning.</p>
        <span>© {new Date().getFullYear()} NoteNest</span>
      </footer>

      {message && (
        <div className="toast" role="status">
          <span>{message}</span>
          <button onClick={() => setMessage("")} aria-label="Close message">
            <X size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
