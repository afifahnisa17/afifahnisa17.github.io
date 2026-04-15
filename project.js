const projectsData = [
    {
        title: "Music Recommendation System",
        category: "AI/ML",
        tag: "Projek Pribadi",
        subText: "ANN Approach (Annoy, FAISS, HNSW)",
        points: [
            "Membangun sistem rekomendasi musik berbasis similarity search menggunakan ANN.",
            "Evaluasi Recall@K, latency, dan indexing time.",
            "Analisis trade-off kecepatan vs akurasi."
        ],
        tools: "Streamlit, Python, Annoy, FAISS, HNSW",
        link: "https://github.com/afifahnisa17/music-similarity-search-approximate-nearest-neighbor"
    },
    {
        title: "SLM Document Intelligence System",
        category: "AI/ML",
        tag: "Projek Pribadi (On Progress)",
        subText: "SLM + RAG (Chroma, Embedding, Retrieval)",
        points: [
            "Membangun sistem document intelligence berbasis SLM untuk memahami dan memproses dokumen secara offline.",
            "Mengimplementasikan pipeline RAG: parsing PDF, chunking, embedding, dan semantic retrieval menggunakan vector database.",
            "Mengembangkan fitur Q&A berbasis konteks dokumen dengan pendekatan retrieval-augmented generation.",
            "Merancang sistem yang privacy-first dengan local inference tanpa ketergantungan API eksternal."
        ],
        tools: "Python, Streamlit, Ollama, ChromaDB",
        link: "https://github.com/afifahnisa17/slm-document-intelligence"
    },
    {
        title: "Web Development with Laravel",
        category: "Web Development",
        tag: "Tugas Akhir Semester 4",
        subText: "Posisi: Backend Developer",
        points: [
            "Merancang skema database relasional (ERD, normalisasi tabel) sesuai kebutuhan sistem.",
            "Mengimplementasikan backend menggunakan Laravel (MVC, routing, controller).",
            "Mengelola integrasi database MySQL dengan backend."
        ],
        tools: "Laravel, PHP, MySQL, SQL",
        link: "https://github.com/Syahru1/SIP-PREMARLO-2025"
    },
    {
        title: "FINALIS JTI - Sistem Bebas Tanggungan TA",
        category: "Web Development",
        tag: "Tugas Akhir Semester 3",
        subText: "Posisi: Database Designer",
        points: [
            "Merancang arsitektur database relasional yang kompleks menggunakan Microsoft SQL Server.",
            "Mengimplementasikan normalisasi database untuk menjamin integritas data sistem tugas akhir.",
            "Mengoptimalkan kueri SQL untuk efisiensi pengambilan data pada arsitektur MVC."
        ],
        tools: "PHP Native, MS SQL Server, SQL",
        link: "https://github.com/andromeda-hebat/FINALIS-JTI-WEB"
    }
];